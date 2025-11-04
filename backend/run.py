from app import create_app, db
from flask import g

app = create_app()

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)

# For Gunicorn
app = create_app()