import React from 'react';

function NoteItem({ note }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{note.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Subject: {note.subject}</h6>
          <p className="card-text">{note.content}</p>
          <p className="card-text mt-auto"><small className="text-muted">Tags: {note.tags.join(', ')}</small></p>
          {note.file_url && (
            <a href={note.file_url} className="btn btn-secondary mt-2" target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
