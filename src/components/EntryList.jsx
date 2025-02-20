import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import EntryCard from "./EntryCard";
import FilterModal from "./FilterModal";

const EntryList = ({ entries, selectedEntry, setSelectedEntry }) => {
    const navigate = useNavigate();
    const [activeEntry, setActiveEntry] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [filteredEntries, setFilteredEntries] = useState(entries); 

    // Handle select entry for event list and detail view
    const handleSelectEntry = (entry) => {
        setSelectedEntry(entry);
        setActiveEntry(entry.id);
    };

    // Update filteredEntries
    useEffect(() => {
        setFilteredEntries(entries);
    }, [entries]);

    // Reset activeEntry when selectedEntry is closed
    useEffect(() => {
        if (!selectedEntry) {
            setActiveEntry(null);
        }
    }, [selectedEntry]);

    // Search filteredEntries
    const finalEntries = filteredEntries.filter(entry =>
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        entry.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col bg-base-300 p-4 rounded-lg gap-4">
            {/* Search & Filter Bar */}
            <div className="flex flex-wrap gap-2 bg-neutral p-2 items-center justify-center rounded-lg">
                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered w-24 md:w-auto"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <FilterModal entries={entries} setFilteredEntries={setFilteredEntries} />
                <button className="btn btn-outline btn-accent w-24 md:w-auto" onClick={() => navigate("/details")}>
                    Add New Entry
                </button>
            </div>

            {/* Filtered entry list */}
            <div className="flex flex-col gap-2">
                {finalEntries.length > 0 ? (
                    finalEntries.map((entry) => (
                        <EntryCard
                            key={entry.id}
                            entry={entry}
                            isActive={entry.id === activeEntry}
                            onClick={() => handleSelectEntry(entry)}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No matching entries found.</p>
                )}
            </div>
        </div>
    );
};

export default EntryList;