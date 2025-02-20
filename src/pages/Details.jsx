import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getNotes, saveNote } from "../utils/localStorage";

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("General");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [error, setError] = useState("");  // Error state for validation

    useEffect(() => {
        if (id) {
            // Load the note for editing
            const notes = getNotes();
            const note = notes.find(n => n.id === id);
            if (note) {
                setTitle(note.title);
                setContent(note.content);
                setCategory(note.category);
                setDate(new Date(note.date).toISOString().split("T")[0]);
            }
        }
    }, [id]);

    const handleSave = () => {
      console.log("handleSave called"); // Check if function is triggered
    
        // Validation: All fields must be filled
        if (!title || !content || !category || !date) {
            setError("All fields are required.");
            console.log("⚠️ Validation failed");
            return;
        }
    
        const newNote = {
            id: id || crypto.randomUUID(),
            title,
            content,
            category,
            date
        };
    
        console.log("New Note:", newNote); // Check new note object
    
        saveNote(newNote);
        console.log("Note saved, navigating to /home");
    
        navigate("/home"); // Redirect back to home after saving
    };

    const handleCancel = () => {
        navigate("/home"); // Redirect to home without saving
    };

    return (
        <div className="container mx-auto my-4 p-6 h-screen bg-neutral items-center justify-center rounded-lg">
            <h1 className="text-2xl font-bold">{id ? "Edit Note" : "New Note"}</h1>

            {/* Error Message */}
            {error && (
                <div className="flex alert alert-warning shadow-lg mt-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{error}</span>
                </div>
            )}

            <div className="form-control mt-4">
                <label className="label">Title</label>
                <input
                    type="text"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="flex gap-4 mt-4">
                {/* Category Dropdown */}
                <div className="form-control w-1/2">
                    <label className="label">Category</label>
                    <select
                        className="select select-bordered"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        <option>General</option>
                        <option>Work</option>
                        <option>Personal</option>
                        <option>Ideas</option>
                        <option>Travel</option>
                        <option>To-Do</option>
                        <option>Education</option>
                    </select>
                </div>

                {/* Date Picker */}
                <div className="form-control w-1/2">
                    <label className="label">Date</label>
                    <input
                        type="date"
                        className="input input-bordered"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="form-control mt-4">
                <label className="label">Content</label>
                <textarea
                    className="textarea textarea-bordered h-96"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>

            <div className="flex w-full gap-4 justify-end">
                <button className="btn btn-accent mt-4 w-24" onClick={handleSave}>
                    Save
                </button>
                <button className="btn btn-outline mt-4 w-24" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Details;