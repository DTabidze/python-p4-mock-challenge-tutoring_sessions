from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, Student,Tutor,Session

fake = Faker()
specialties=["math","english","science","social studies"]

def create_students():
    students = []
    for _ in range(20):
        s = Student(
            name=fake.first_name(),
        )
        students.append(s)

    return students


def create_tutors():
    tutors = []
    names = []
    for _ in range(5):
        name = fake.name()
        while name in names:
            name = fake.name()
        names.append(name)

        t = Tutor(
            name=name,
            specialty=rc(specialties),
        )
        tutors.append(t)

    return  tutors


def create_tutoring_sessions(students, tutors):
    sessions = []
    for _ in range(20):
        s = Session(
            student_id=rc(students).id,
            tutor_id=rc(tutors).id
        )
        sessions.append(s)
    return sessions


if __name__ == '__main__':

    with app.app_context():
        print("Clearing db...")
        Session.query.delete()
        Student.query.delete()
        Tutor.query.delete()

        print("Seeding students...")
        students = create_students()
        db.session.add_all(students)
        db.session.commit()

        print("Seeding tutors...")
        tutors = create_tutors()
        db.session.add_all(tutors)
        db.session.commit()

        print("Seeding sessions...")
        missions = create_tutoring_sessions(students, tutors)
        db.session.add_all(missions)
        db.session.commit()

        print("Done seeding!")
