# Online Notes Repository

A full-stack web application for searching and managing PDF notes. Users can search for notes by subject, title, or keywords, and view PDF files directly in the browser.

## Technologies Used

* **Frontend**: React, Bootstrap
* **Backend**: Flask
* **Database**: PostgreSQL or SQLite

## Features

* **Search Functionality**: Find notes based on subject, title, or keywords.
* **PDF Viewer**: Securely view PDF notes in the browser.
* **Note Management**: Create, view, and manage notes and their metadata.
* **Category-based organization**: Notes are categorized by subject.

## Setup Instructions

Follow these steps to set up and run the project on your local machine.

### Prerequisites

* Python 3.x
* Node.js and npm
* (Optional for production) PostgreSQL

### 1. Backend Setup

1.  Navigate to the `backend` directory.
    ```bash
    cd backend
    ```
2.  Create and activate a Python virtual environment.
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```
3.  Install the required Python packages.
    ```bash
    pip install -r requirements.txt
    ```
4.  Run the Flask application. This will also create the database and tables.
    ```bash
    python run.py
    ```
    The backend server will run on `http://localhost:5000`.

### 2. Frontend Setup

1.  Open a new terminal and navigate to the `frontend` directory.
    ```bash
    cd frontend
    ```
2.  Install the npm packages.
    ```bash
    npm install
    ```
3.  Start the React development server.
    ```bash
    npm start
    ```
    The frontend application will open in your browser at `http://localhost:3000`.

---

If you have any more questions about a specific part of your project, feel free to ask!