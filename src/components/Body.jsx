import { useState, useEffect } from "react";
import DetailView from "./DetailView.jsx"
import EntryList from "./EntryList.jsx"
import { getNotes } from "../utils/localStorage.js";

const Body = () => {
    const [entries, setEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    
    // Load entries from local storage
    useEffect(() => {
        const notes = getNotes();
        setEntries(notes); 
    }, []); 

    return (
        <div className="container mx-auto grid grid-cols-5 h-screen">
            {/* Left column (2fr) */}
            <div className="col-span-2 p-4">
                <EntryList entries={entries} selectedEntry={selectedEntry} setSelectedEntry={setSelectedEntry} />
            </div>

            {/* Right column (3fr) */}
            <div className="col-span-3 p-4">
                <DetailView selectedEntry={selectedEntry} setEntries={setEntries} setSelectedEntry={setSelectedEntry} />
            </div>
        </div>
    )
}

export default Body;