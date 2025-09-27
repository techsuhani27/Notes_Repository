import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState('');
  const [tags, setTags] = useState('');

  // Debug: Log subjects whenever they change
  useEffect(() => {
    console.log('Subjects state updated:', subjects);
  }, [subjects]);

  useEffect(() => {
    fetchNotes();
    fetchSubjects();
  }, []);

  const fetchNotes = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await axios.get(`${apiUrl}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      console.log('Fetching subjects...');
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await axios.get(`${apiUrl}/subjects`);
      console.log('Subjects response:', response.data);
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      // Fallback: if API fails, provide some default subjects
      const defaultSubjects = [
        { id: 1, name: 'Computer Science' },
        { id: 2, name: 'Mathematics' },
        { id: 3, name: 'Physics' },
        { id: 4, name: 'Programming' },
        { id: 5, name: 'Web Development' }
      ];
      setSubjects(defaultSubjects);
      console.log('Using default subjects due to API error');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    
    if (!subject.trim()) {
      alert('Please enter a subject');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('subject', subject);
    formData.append('tags', tags);
    if (file) {
      formData.append('file', file);
    }

    try {
      console.log('Submitting note with data:', { title, content, subject, tags, file: file?.name });
      
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await axios.post(`${apiUrl}/notes/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Note uploaded successfully:', response.data);
      alert('Note uploaded successfully!');
      
      // Clear form
      setTitle('');
      setContent('');
      setSubject('');
      setTags('');
      setFile(null);
      // Clear file input
      const fileInput = document.getElementById('file');
      if (fileInput) fileInput.value = '';
      
      // Refresh notes list
      fetchNotes();
    } catch (error) {
      console.error('Error uploading note:', error);
      
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.error || `Server error: ${error.response.status}`;
        alert(`Error: ${errorMessage}`);
      } else if (error.request) {
        // Network error
        alert('Network error: Cannot connect to server. Make sure the backend is running.');
      } else {
        // Other error
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="App container mt-5">
      <div className="main-header">
        <h1>📚 Notes Repository</h1>
        <p>Organize your knowledge beautifully</p>
      </div>
      <form onSubmit={handleSubmit} className="notes-form">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">📝 Title</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">📄 Content</label>
          <textarea className="form-control" id="content" rows="3" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">📚 Subject</label>
          <select className="form-control" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required>
            <option value="">Select a subject...</option>
            {subjects && subjects.length > 0 ? (
              subjects.map(subj => (
                <option key={subj.id} value={subj.name}>{subj.name}</option>
              ))
            ) : (
              <option value="" disabled>Loading subjects...</option>
            )}
          </select>
          {/* Debug info */}
          <small className="debug-info">📊 Available subjects: {subjects.length}</small>
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">🏷️ Tags (comma-separated)</label>
          <input type="text" className="form-control" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">📎 Upload PDF</label>
          <input type="file" className="form-control" id="file" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn btn-primary">✨ Add Note</button>
      </form>

      <div className="notes-section">
        <h2 className="section-title">🗂️ Your Notes Collection</h2>
        <div className="row">
        {notes.map(note => (
          <div className="col-md-4 mb-4" key={note.id}>
            <div className="card note-card">
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Subject: {note.subject}</h6>
                <p className="card-text">{note.content}</p>
                <p className="card-text tag-text">🏷️ Tags: {note.tags.join(', ')}</p>
                {note.file_url ? (
                  <div>
                    <a 
                      href={note.file_url} 
                      className="btn btn-secondary btn-sm me-2" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        console.log('Opening PDF:', note.file_url);
                        // Test if URL is accessible
                        fetch(note.file_url, { method: 'HEAD' })
                          .catch(err => {
                            console.error('PDF file not accessible:', err);
                            alert('PDF file not found or not accessible');
                            e.preventDefault();
                          });
                      }}
                    >
                      View PDF
                    </a>
                    <small className="file-info d-block">📄 File: {note.file_url}</small>
                  </div>
                ) : (
                  <span className="text-muted small">No file attached</span>
                )}
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default App;