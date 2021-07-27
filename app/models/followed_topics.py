from .db import db
from datetime import datetime


class FollowedTopics(db.Model):
    __tablename__ = 'Followed Topics'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    topicString = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime(timezone=False), default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime(timezone=False), default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref(
        "followedTopics", cascade="all, delete-orphan"), uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'topicString': self.topicString
        }
