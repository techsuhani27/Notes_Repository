from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile(os.path.join(os.path.pardir, 'config.py'))
    
    # Initialize extensions
    db.init_app(app)
    
    # Configure CORS for production
    CORS(app, origins=[
        "http://localhost:3000",  # Local development
        "https://*.railway.app",  # Railway frontend URLs (wildcard)
        "https://your-frontend-xxx.railway.app",  # Replace with actual URL
    ])
    
    from .routes import main_blueprint
    app.register_blueprint(main_blueprint)

    return app