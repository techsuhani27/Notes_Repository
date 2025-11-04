# Environment Configuration for Production and Development
import os

# Get the directory of this config file
basedir = os.path.abspath(os.path.dirname(__file__))

# Database configuration - Production ready
if os.environ.get('DATABASE_URL'):
    # Production database (PostgreSQL on Heroku/Railway)
    db_url = os.environ.get('DATABASE_URL')
    if db_url.startswith('postgres://'):
        db_url = db_url.replace('postgres://', 'postgresql://', 1)
    SQLALCHEMY_DATABASE_URI = db_url
else:
    # Development database (SQLite)
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'instance', 'notes.db')

SQLALCHEMY_TRACK_MODIFICATIONS = False

# Directory for file uploads
UPLOAD_FOLDER = os.path.join(basedir, 'uploads')

# Ensure directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(os.path.join(basedir, 'instance'), exist_ok=True)

# Secret key for sessions (use environment variable in production)
SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'