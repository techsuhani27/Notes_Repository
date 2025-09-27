# Configuration for the Flask app
import os

# Get the directory of this config file
basedir = os.path.abspath(os.path.dirname(__file__))

# Database connection URI - using absolute path for SQLite
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
    'sqlite:///' + os.path.join(basedir, 'instance', 'notes.db')
# For PostgreSQL, use a connection string like this:
# SQLALCHEMY_DATABASE_URI = 'postgresql://user:password@host:port/database'
SQLALCHEMY_TRACK_MODIFICATIONS = False

# Directory for file uploads
UPLOAD_FOLDER = os.path.join(basedir, 'uploads')
# Ensure the uploads and instance folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(os.path.join(basedir, 'instance'), exist_ok=True)