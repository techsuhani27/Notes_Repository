from . import db

# Join table for the many-to-many relationship
notes_tags = db.Table('notes_tags',
    db.Column('note_id', db.Integer, db.ForeignKey('note.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True)
)

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    content = db.Column(db.Text, nullable=False)
    file_path = db.Column(db.String(250), nullable=True)
    subject_id = db.Column(db.Integer, db.ForeignKey('subject.id'), nullable=False)

    tags = db.relationship('Tag', secondary=notes_tags, lazy='subquery', backref=db.backref('notes', lazy=True))

    def __repr__(self):
        return f'<Note {self.title}>'

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    def __repr__(self):
        return f'<Tag {self.name}>'

class Subject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    notes = db.relationship('Note', backref='subject', lazy=True)

    def __repr__(self):
        return f'<Subject {self.name}>'