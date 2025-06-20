import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');

  // Fetch notes from backend
  useEffect(() => {
    axios.get('https://notes-api.onrender.com/api/notes')
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add note
  const addNote = async () => {
    if (!input) return;
    const res = await axios.post('https://notes-api.onrender.com/api/notes', { text: input });
    setNotes([...notes, res.data]);
    setInput('');
  };

  // Delete note
  const deleteNote = async (id) => {
    await axios.delete(`https://notes-api.onrender.com/api/notes/${id}`);
    setNotes(notes.filter(note => note._id !== id));
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial",backgroundColor:"pink",textAlign:"center" }}>
      <h2>📝 Hellooooo Forget-Me-Not </h2>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Write your note here..."
      />
      <button onClick={addNote}>Add</button>

      <ul>
        {notes.map(note => (
          <li key={note._id}>
            {note.text} 
            <button onClick={() => deleteNote(note._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
