from flask import Blueprint, jsonify, request, send_from_directory
from . import db
from .models import Note, Tag, Subject
from werkzeug.utils import secure_filename
import os

main_blueprint = Blueprint('main', __name__)

@main_blueprint.route('/notes', methods=['GET'])
def get_all_notes():
    notes = Note.query.all()
    notes_list = []
    for note in notes:
        tags = [tag.name for tag in note.tags]
        
        # Generate file URL if file exists
        file_url = None
        if note.file_path and os.path.exists(note.file_path):
            filename = os.path.basename(note.file_path)
            file_url = f'http://127.0.0.1:5000/uploads/{filename}'
        
        notes_list.append({
            'id': note.id,
            'title': note.title,
            'content': note.content,
            'subject': note.subject.name,
            'tags': tags,
            'file_url': file_url,
            'has_file': file_url is not None
        })
    return jsonify(notes_list)

@main_blueprint.route('/notes/upload', methods=['POST'])
def upload_note():
    title = request.form['title']
    content = request.form['content']
    subject_name = request.form['subject']
    tags = request.form.get('tags', '').split(',')

    # Handle file upload
    file = request.files.get('file')
    file_path = None
    if file and file.filename:
        filename = secure_filename(file.filename)
        upload_folder = os.path.join(main_blueprint.root_path, os.path.pardir, 'uploads')
        file_path = os.path.join(upload_folder, filename)
        file.save(file_path)

    subject = Subject.query.filter_by(name=subject_name).first()
    if not subject:
        return jsonify({"error": "Subject not found"}), 404

    new_note = Note(title=title, content=content, subject=subject, file_path=file_path)

    for tag_name in tags:
        tag_name = tag_name.strip()
        if tag_name:
            tag = Tag.query.filter_by(name=tag_name).first()
            if not tag:
                tag = Tag(name=tag_name)
                db.session.add(tag)
            new_note.tags.append(tag)

    db.session.add(new_note)
    db.session.commit()
    return jsonify({"message": "Note uploaded successfully", "note_id": new_note.id}), 201

@main_blueprint.route('/uploads/<filename>')
def uploaded_file(filename):
    upload_folder = os.path.join(main_blueprint.root_path, os.path.pardir, 'uploads')
    file_path = os.path.join(upload_folder, filename)
    
    # Debug logging
    print(f"Requested file: {filename}")
    print(f"Upload folder: {upload_folder}")
    print(f"Full file path: {file_path}")
    print(f"File exists: {os.path.exists(file_path)}")
    
    if not os.path.exists(file_path):
        return jsonify({"error": "File not found", "path": file_path}), 404
    
    return send_from_directory(upload_folder, filename)

@main_blueprint.route('/subjects', methods=['GET'])
def get_subjects():
    subjects = Subject.query.all()
    subjects_list = [{'id': subject.id, 'name': subject.name} for subject in subjects]
    return jsonify(subjects_list)

@main_blueprint.route('/subjects', methods=['POST'])
def create_subject():
    data = request.get_json()
    subject_name = data.get('name')
    
    if not subject_name:
        return jsonify({"error": "Subject name is required"}), 400
    
    # Check if subject already exists
    existing_subject = Subject.query.filter_by(name=subject_name).first()
    if existing_subject:
        return jsonify({"error": "Subject already exists"}), 409
    
    new_subject = Subject(name=subject_name)
    db.session.add(new_subject)
    db.session.commit()
    
    return jsonify({"message": "Subject created successfully", "subject": {"id": new_subject.id, "name": new_subject.name}}), 201

@main_blueprint.route('/notes/search', methods=['GET'])
def search_notes():
    query = request.args.get('q', '')
    subject = request.args.get('subject', '')
    tag = request.args.get('tag', '')
    
    notes_query = Note.query
    
    if query:
        notes_query = notes_query.filter(
            (Note.title.contains(query)) | (Note.content.contains(query))
        )
    
    if subject:
        notes_query = notes_query.join(Subject).filter(Subject.name.contains(subject))
    
    if tag:
        notes_query = notes_query.join(Note.tags).filter(Tag.name.contains(tag))
    
    notes = notes_query.all()
    notes_list = []
    for note in notes:
        tags = [tag.name for tag in note.tags]
        notes_list.append({
            'id': note.id,
            'title': note.title,
            'content': note.content,
            'subject': note.subject.name,
            'tags': tags,
            'file_url': f'/uploads/{os.path.basename(note.file_path)}' if note.file_path else None
        })
    
    return jsonify(notes_list)

@main_blueprint.route('/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    note = Note.query.get_or_404(note_id)
    
    # Delete associated file if exists
    if note.file_path and os.path.exists(note.file_path):
        os.remove(note.file_path)
    
    db.session.delete(note)
    db.session.commit()
    
    return jsonify({"message": "Note deleted successfully"}), 200

@main_blueprint.route('/tags', methods=['GET'])
def get_tags():
    tags = Tag.query.all()
    tags_list = [{'id': tag.id, 'name': tag.name} for tag in tags]
    return jsonify(tags_list)