const { useState } = React;

function NoteApp() {
    const [notes, setNotes] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editId, setEditId] = useState(null);

    const handleAddOrUpdate = () => {
        if (inputValue.trim() === '') return;

        if (editId !== null) {
            // Update existing note
            setNotes(notes.map(note => 
                note.id === editId ? { ...note, text: inputValue } : note
            ));
            setEditId(null);
        } else {
            // Add new note
            const newNote = {
                id: Date.now(),
                text: inputValue
            };
            setNotes([...notes, newNote]);
        }
        setInputValue('');
    };

    const handleEdit = (note) => {
        setInputValue(note.text);
        setEditId(note.id);
    };

    const handleDelete = (id) => {
        setNotes(notes.filter(note => note.id !== id));
        // Clear input if deleting the note currently being edited
        if (editId === id) {
            setEditId(null);
            setInputValue('');
        }
    };

    return (
        <div className="app-container">
            <h1>Note App</h1>
            <div className="input-container">
                <input 
                    type="text" 
                    placeholder="Enter your note..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddOrUpdate()}
                />
                <button onClick={handleAddOrUpdate}>
                    {editId !== null ? 'Update' : 'Add'}
                </button>
            </div>
            
            <div className="notes-list">
                {notes.map(note => (
                    <div key={note.id} className="note-item">
                        <span className="note-content">{note.text}</span>
                        <div className="note-actions">
                            <button className="btn-update" onClick={() => handleEdit(note)}>Update</button>
                            <button className="btn-delete" onClick={() => handleDelete(note.id)}>Delete</button>
                        </div>
                    </div>
                ))}
                {notes.length === 0 && <p style={{ textAlign: 'center', color: '#888' }}>No notes yet. Add one!</p>}
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NoteApp />);
