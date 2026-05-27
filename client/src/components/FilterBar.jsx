function FilterBar( {activeFilter, setActiveFilter} ){
    const statuses = ["Applied", "Assessment", "Phone Screen", "Interview", "Offer", "Rejected", "Withdrawn", "All"];
    return (
        <div>
            {statuses.map((status) => (
                <button key={status} onClick={() => setActiveFilter(status)}>{status}</button>
            ))}
        </div>
    );
}

export default FilterBar;