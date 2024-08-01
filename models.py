from mongoengine import Document, StringField, ReferenceField, FloatField, ListField
from mongoengine import *

class Organization(Document):
    name = StringField(required=True)
    org_id = StringField(required=True)
    user_id = StringField(required=True)    
    invite_code = StringField(null=True)

class User(Document):
    full_name = StringField(required=True)
    org_id = ListField(StringField())
    user_id = StringField(required=True)

class Usecase(Document):
    usecase_id = StringField(required=True)
    org_id = StringField(required=True)
    name = StringField(required=True)
    description = StringField(required=True)
    risks=ListField(StringField())
    bigRisk = BooleanField(null=True)
    advantages=ListField(StringField())
    value_score = FloatField()
    implementation_score = FloatField()
class ValueScores(Document):
    score_id = StringField(required=True)
    usecase_id = StringField(required=True)
    user_id = StringField(required=True)
    alignment = FloatField()
    advantages = ListField(DictField())
    savings = FloatField()
    score = FloatField()

class ImplementationScores(Document):
    score_id = StringField(required=True)
    usecase_id = StringField(required=True)
    user_id = StringField(required=True)
    data = ListField(IntField())
    algorithms = ListField(IntField())
    processes = ListField(IntField())
    knowledge = ListField(IntField())
    time = IntField()
    score = FloatField()

