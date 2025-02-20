// Sign Up function
export const signUp = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Validate if user already exists
    if (users.some(user => user.email === email)) {
        return { success: false, message: 'User already exists!' };
    }

    // Create new user
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return { success: true, message: 'Signed up successfully.' };
};

// Sign In function
export const signIn = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        return { success: false, message: 'Incorrect login details.' };
    }

    // Save current user session
    localStorage.setItem('currentUser', JSON.stringify(user));

    return { success: true, message: 'Signed in successfully.', user };
};

// Get current user function
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser'));
};

// Sign Out function
export const logout = () => {
    localStorage.removeItem('currentUser');
};

export const saveNote = (note) => {
    const user = getCurrentUser();
    console.log("👤 Current User:", user); // Check if user is signed in

    if (!user) {
        console.log("❌ No user signed in");
        return { success: false, message: "No user signed in!" };
    }

    const notes = JSON.parse(localStorage.getItem("notes")) || {};
    console.log("📥 Existing Notes:", notes); // Check existing notes

    // Initialize empty array for users without entries
    if (!notes[user.email]) {
        notes[user.email] = [];
    }

    // Add or update the note
    const index = notes[user.email].findIndex(n => n.id === note.id);
    if (index > -1) {
        console.log("✏️ Updating existing note");
        notes[user.email][index] = note;
    } else {
        console.log("➕ Adding new note");
        notes[user.email].push(note);
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    console.log("✅ Notes saved:", notes); // Check saved notes

    return { success: true, message: "Note saved!" };
};

// Get all notes for current user
export const getNotes = () => {
    const user = getCurrentUser();
    if (!user) return [];

    const notes = JSON.parse(localStorage.getItem("notes")) || {};
    return notes[user.email] || [];
};

// Delete a note by ID
export const deleteNote = (id) => {
    const user = getCurrentUser();
    if (!user) return { success: false, message: "No user signed in!" };

    const notes = JSON.parse(localStorage.getItem("notes")) || {};

    if (!notes[user.email]) return { success: false, message: "No note found!" };

    // Filter out the deleted note
    notes[user.email] = notes[user.email].filter(note => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));

    return { success: true, message: "Note deleted!" };
};