#!/usr/bin/env python3

from models import db, Student, Tutor, Session
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request
from sqlalchemy.exc import IntegrityError
import datetime
from sqlalchemy.sql import text

import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)


@app.route("/students", methods=["GET", "POST"])
def get_students():
    if request.method == "GET":
        all = Student.query.all()
        students = []
        for student in all:
            students.append(student.to_dict(rules=("-sessions",)))
        return students, 200
    elif request.method == "POST":
        data = request.json
        student = Student()
        try:
            for attr in data:
                setattr(student, attr, data[attr])
            print(student)
            db.session.add(student)
            db.session.commit()
            return (student.to_dict(rules=("-sessions",)), 201)
        except (IntegrityError, ValueError) as ie:
            return {"errors": ie.args}, 422


@app.route("/students/<int:id>", methods=["GET", "PATCH", "DELETE"])
def get_Student_by_id(id):
    student = Student.query.filter(Student.id == id).first()
    if not student:
        return {"error": "Student not found"}, 404
    elif request.method == "GET":
        return student.to_dict(), 200
    elif request.method == "PATCH":
        data = request.json
        try:
            for attr in data:
                setattr(student, attr, data[attr])
            db.session.commit()
            return (student.to_dict(rules=("-sessions",)), 200)
        except (IndentationError, ValueError) as ie:
            return {"errors": ie.args}, 422
    elif request.method == "DELETE":
        db.session.delete(student)
        db.session.commit()
        return {}, 200


@app.route("/tutors", methods=["GET", "POST"])
def get_tutors():
    if request.method == "GET":
        all = Tutor.query.all()
        tutors = []
        for tutor in all:
            tutors.append(tutor.to_dict(rules=("-sessions",)))
        return tutors, 200


@app.route("/sessions", methods=["POST"])
def add_session():
    if request.method == "POST":
        data = request.json
        session = Session()
        db.session.execute(text("PRAGMA foreign_keys=on;"))
        try:
            for attr in data:
                if attr == "datetime":
                    setattr(
                        session,
                        attr,
                        datetime.datetime.strptime(data[attr], "%Y-%m-%d %H:%M:%S.%f"),
                    )
                else:
                    setattr(session, attr, data[attr])
            db.session.add(session)
            db.session.commit()
            return session.to_dict(), 201
        except (IntegrityError, ValueError) as ie:
            return {"errors": ie.args}, 422


if __name__ == "__main__":
    app.run(port=5555, debug=True)
