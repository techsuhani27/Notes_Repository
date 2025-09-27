import axios from 'axios';

// Base API configuration
const API_BASE_URL = '/'; // Using proxy configuration

// Notes API functions
export const notesApi = {
  // Get all notes
  getAllNotes: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}notes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },

  // Upload a new note
  uploadNote: async (noteData) => {
    try {
      const formData = new FormData();
      formData.append('title', noteData.title);
      formData.append('content', noteData.content);
      formData.append('subject', noteData.subject);
      formData.append('tags', noteData.tags);
      if (noteData.file) {
        formData.append('file', noteData.file);
      }

      const response = await axios.post(`${API_BASE_URL}notes/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading note:', error);
      throw error;
    }
  },

  // Search notes
  searchNotes: async (query, subject = '', tag = '') => {
    try {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (subject) params.append('subject', subject);
      if (tag) params.append('tag', tag);
      
      const response = await axios.get(`${API_BASE_URL}notes/search?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error searching notes:', error);
      throw error;
    }
  },

  // Delete a note
  deleteNote: async (noteId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}notes/${noteId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }
};

// Subjects API functions
export const subjectsApi = {
  // Get all subjects
  getAllSubjects: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}subjects`);
      return response.data;
    } catch (error) {
      console.error('Error fetching subjects:', error);
      throw error;
    }
  },

  // Create a new subject
  createSubject: async (name) => {
    try {
      const response = await axios.post(`${API_BASE_URL}subjects`, { name });
      return response.data;
    } catch (error) {
      console.error('Error creating subject:', error);
      throw error;
    }
  }
};

// Tags API functions
export const tagsApi = {
  // Get all tags
  getAllTags: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}tags`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  }
};
