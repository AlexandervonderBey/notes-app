import { useState } from "react";

const FilterModal = ({ entries, setFilteredEntries }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortOption, setSortOption] = useState("");

    // Select categories from list
    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category) // Remove if category exists already
                : [...prev, category] // Add category
        );
    };

    // Filter & sort functions
    const applyFilters = () => {
        let filtered = [...entries];

        // 🔍 Filter by selected categories
        if (selectedCategories.length > 0) {
            filtered = filtered.filter((entry) =>
                selectedCategories.includes(entry.category)
            );
        }

        // 🔀 Sorting (title & date)
        if (sortOption === "title-asc") {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === "title-desc") {
            filtered.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortOption === "date-asc") {
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (sortOption === "date-desc") {
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        setFilteredEntries(filtered); 
        document.getElementById("filter-modal").close(); 
    };

    return (
        <div>
            <button
                className="btn btn-outline w-24 md:w-auto"
                onClick={() => document.getElementById("filter-modal").showModal()}
            >
                Options
            </button>

            <dialog id="filter-modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Advanced Search</h3>

                    {/* Category Filters */}
                    <div className="form-control mt-4">
                        <label className="label">Filter by Category</label>
                        <div className="flex flex-col gap-2">
                            {["General", "Work", "Personal", "Ideas", "Travel", "To-Do", "Education"].map(
                                (category) => (
                                    <label key={category} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-accent"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                        />
                                        {category}
                                    </label>
                                )
                            )}
                        </div>
                    </div>

                    {/* Sorting Options */}
                    <div className="form-control mt-4">
                        <label className="label">Sort by</label>
                        <select
                            className="select select-bordered"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}>
                            <option value="">None</option>
                            <option value="title-asc">Title (A–Z)</option>
                            <option value="title-desc">Title (Z–A)</option>
                            <option value="date-asc">Date (Oldest First)</option>
                            <option value="date-desc">Date (Newest First)</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="modal-action">
                        <button className="btn btn-accent" onClick={applyFilters}>
                            Apply Filters
                        </button>
                        <button className="btn" onClick={() => document.getElementById("filter-modal").close()}>
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default FilterModal;