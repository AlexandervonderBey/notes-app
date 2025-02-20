import React from "react";

const EntryCard = ({ entry, onClick, isActive }) => {
    return (
        <div
            className={`bg-neutral p-2 flex flex-col justify-center rounded-lg gap-1 cursor-pointer 
                border transition-all 
                ${isActive ? "border-accent bg-base-200" : "border-transparent hover:border-accent hover:scale-[1.02]"}`}
            onClick={onClick} // Click-Handler für DetailView
        >
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg truncate">{entry.title}</h2>
                <div className="badge badge-accent badge-outline">{entry.category}</div>
            </div>
            <p className="font-light text-sm">{new Date(entry.date).toLocaleDateString()}</p>
        </div>
    );
};

export default EntryCard;