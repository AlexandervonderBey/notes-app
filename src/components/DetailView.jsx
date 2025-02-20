import React from "react";
import { useNavigate } from "react-router";
import { deleteNote } from "../utils/localStorage";

const DetailView = ({ selectedEntry, setEntries, setSelectedEntry }) => {
    const navigate = useNavigate();

    if (!selectedEntry) {
        return (
            <div className="flex flex-col bg-base-300 p-4 rounded-lg gap-4 h-full">
                <p className="text-gray-500 text-center">
                    Select an entry to view details.
                </p>
            </div>
        );
    }

    const handleEdit = () => {
        navigate(`/details/${selectedEntry.id}`);
    };

    const handleDelete = () => {
        deleteNote(selectedEntry.id);
        setEntries((prev) => prev.filter((note) => note.id !== selectedEntry.id)); // Update EntryList
        setSelectedEntry(null);
    };

    const handleClose = () => {
        setSelectedEntry(null);
    };

    return (
        <div className="flex flex-col bg-base-300 p-4 rounded-lg gap-4 h-full">
            {/* Header */}
            <div className="flex flex-col gap-2 bg-neutral p-4 items-start rounded-lg">
                <div className="flex justify-between w-full">
                    <h1 className="text-2xl font-bold">{selectedEntry.title}</h1>
                        <button className="btn btn-sm btn-circle border-2 border-neutral-400 btn-ghost" onClick={handleClose}>
                            ✖
                        </button>
                </div>
                <p className="text-sm text-gray-400">{new Date(selectedEntry.date).toLocaleDateString()}</p>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2 bg-neutral py-2 px-4 items-start rounded-lg">
                <div className="badge badge-accent badge-outline my-2">{selectedEntry.category}</div>
            </div>

            {/* Note content */}
            <div className="bg-neutral p-4 items-start h-full rounded-lg">
                <p className="font-light">{selectedEntry.content}</p>
            </div>

            {/* Edit & delete buttons */}
            <div className="bg-neutral p-4 items-start rounded-lg">
                <div className="flex gap-4 justify-end">
                    <button className="btn btn-outline btn-accent w-24" onClick={handleEdit}>
                        Edit
                    </button>
                    <button className="btn btn-outline btn-error w-24" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailView;