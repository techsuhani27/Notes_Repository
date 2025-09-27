#!/usr/bin/env python3
"""
Script to add initial subjects to the database
"""
import requests
import json

# API endpoint
base_url = "http://localhost:5000"

# Initial subjects to create
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

def create_subject(name):
    """Create a subject via API"""
    try:
        response = requests.post(
            f"{base_url}/subjects",
            json={"name": name},
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 201:
            print(f"✓ Created subject: {name}")
            return True
        elif response.status_code == 409:
            print(f"- Subject already exists: {name}")
            return True
        else:
            print(f"✗ Failed to create subject {name}: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("✗ Cannot connect to backend server. Make sure it's running on http://localhost:5000")
        return False
    except Exception as e:
        print(f"✗ Error creating subject {name}: {str(e)}")
        return False

def main():
    print("Adding initial subjects to the database...")
    print("-" * 50)
    
    success_count = 0
    for subject in subjects:
        if create_subject(subject):
            success_count += 1
    
    print("-" * 50)
    print(f"Successfully created/verified {success_count} out of {len(subjects)} subjects")

if __name__ == "__main__":
    main()