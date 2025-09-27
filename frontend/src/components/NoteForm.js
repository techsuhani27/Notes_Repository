import React, { useState } from 'react';
import axios from 'axios';

function NoteForm({ onNoteAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState('');
  const [tags, setTags] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('subject', subject);
    formData.append('tags', tags);
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.post('/notes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Note uploaded!');
      // Clear form inputs
      setTitle('');
      setContent('');
      setFile(null);
      setSubject('');
      setTags('');
      // Call the parent component's function to refresh notes
      onNoteAdded();
    } catch (error) {
      console.error('Error uploading note:', error);
      alert('Failed to upload note.');
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Upload a New Note</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Content/Description</label>
            <textarea className="form-control" id="content" rows="3" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input type="text" className="form-control" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">Tags (comma-separated)</label>
            <input type="text" className="form-control" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="file" className="form-label">Upload PDF</label>
            <input type="file" className="form-control" id="file" onChange={handleFileChange} />
          </div>
          <button type="submit" className="btn btn-primary">Add Note</button>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;