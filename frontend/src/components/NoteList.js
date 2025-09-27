import React from 'react';

function NoteList({ notes }) {
  return (
    <div className="row">
      {notes.length > 0 ? (
        notes.map(note => (
          <div className="col-md-4 mb-4" key={note.id}>
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
        ))
      ) : (
        <div className="col-12 text-center">
          <p className="text-muted">No notes found.</p>
        </div>
      )}
    </div>
  );
}

export default NoteList;