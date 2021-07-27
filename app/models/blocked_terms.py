from .db import db
from datetime import datetime


class BlockedTerms(db.Model):
    __tablename__ = 'Blocked Terms'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    blockedTerm = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=False), default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime(timezone=False), default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref(
        "blocked", cascade="all, delete-orphan"), uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'blockedTerm': self.blockedTerm
        }
