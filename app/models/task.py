from .db import db


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    notes = db.Column(db.Text)
    due_date = db.Column(db.DateTime)
    completed = db.Column(db.Boolean, default=False)
    completed_date = db.Column(db.DateTime)
    list_id = db.Column(db.Integer, db.ForeignKey("lists.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    list = db.relationship("List", back_populates="tasks")
    user = db.relationship("User", back_populates="tasks")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'notes': self.notes,
            'due_date': self.due_date,
            'completed': self.completed,
            'completed_date': self.completed_date,
            'list_id': self.list_id,
            'user_id': self.user_id,
        }
