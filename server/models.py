from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)


class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    # Add relationships

    # Add serialization rules

    #add validations

class Tutor(db.Model, SerializerMixin):
    __tablename__ = 'tutors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    specialty = db.Column(db.String)

    # Add relationships
    
    # Add serialization rules
    
    # Add validations

class Session(db.Model, SerializerMixin):
    __tablename__ = 'sessions'

    id = db.Column(db.Integer, primary_key=True)
    datetime = db.Column(db.DateTime)

    # Add relationships
   
    # Add serialization rules
    
    # Add validations

# add any models you may need.
