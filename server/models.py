from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, func
import datetime
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)


class Student(db.Model, SerializerMixin):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    # Add relationships
    sessions = db.relationship(
        "Session", cascade="all,delete", back_populates="student"
    )
    # Add serialization rules
    serialize_rules = ("-sessions.student",)

    # add validations
    @validates("name")
    def validate_name(self, key, value):
        if not isinstance(value, str) or len(value) == 0:
            raise ValueError(f"{key} must be string")
        return value


class Tutor(db.Model, SerializerMixin):
    __tablename__ = "tutors"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    specialty = db.Column(db.String)

    # Add relationships
    sessions = db.relationship("Session", back_populates="tutor")

    # Add serialization rules
    serialize_rules = ("-sessions.tutor",)

    # Add validations
    @validates("name")
    def validate_name(self, key, value):
        if not isinstance(value, str) or len(value) == 0:
            raise ValueError(f"{key} must be string")
        return value

    @validates("specialty")
    def validate_specialty(self, key, value):
        if not isinstance(value, str) or len(value) == 0:
            raise ValueError(f"{key} must be string")
        return value


class Session(db.Model, SerializerMixin):
    __tablename__ = "sessions"

    id = db.Column(db.Integer, primary_key=True)
    datetime = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # Add relationships
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"))
    tutor_id = db.Column(db.Integer, db.ForeignKey("tutors.id"))
    student = db.relationship("Student", back_populates="sessions")
    tutor = db.relationship("Tutor", back_populates="sessions")
    # Add serialization rules
    serialize_rules = (
        "-student.sessions",
        "-tutor.sessions",
    )

    # Add validations
    @validates("datetime")
    def validate_datetime(self, key, value):
        if not isinstance(value, datetime.datetime):
            raise ValueError(f"{key} must be date type")
        return value

    @validates("student_id")
    def validate_student_id(self, key, value):
        if not isinstance(value, int) or value < 1:
            raise ValueError(f"{key} must be int and above 0")
        return value

    @validates("tutor_id")
    def validate_tutor_id(self, key, value):
        if not isinstance(value, int) or value < 1:
            raise ValueError(f"{key} must be int and above 0")
        return value


# add any models you may need.
