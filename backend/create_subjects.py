#!/usr/bin/env python3
"""
Script to add initial subjects directly to the database
"""
import sys
import os

# Add the app directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app import create_app, db
from app.models import Subject

def add_subjects():
    app = create_app()
    
    subjects = [
        "Computer Science",
        "Mathematics", 
        "Physics",
        "Programming",
        "Web Development",
        "Data Science",
        "Machine Learning",
        "Database Design"
    ]
    
    with app.app_context():
        print("Adding initial subjects to the database...")
        print("-" * 50)
        
        for subject_name in subjects:
            # Check if subject already exists
            existing_subject = Subject.query.filter_by(name=subject_name).first()
            
            if existing_subject:
                print(f"- Subject already exists: {subject_name}")
            else:
                # Create new subject
                new_subject = Subject(name=subject_name)
                db.session.add(new_subject)
                print(f"✓ Created subject: {subject_name}")
        
        # Commit all changes
        db.session.commit()
        print("-" * 50)
        print("Successfully added subjects to the database!")
        
        # Show all subjects
        all_subjects = Subject.query.all()
        print(f"Total subjects in database: {len(all_subjects)}")
        for subject in all_subjects:
            print(f"  - {subject.name}")

if __name__ == "__main__":
    add_subjects()