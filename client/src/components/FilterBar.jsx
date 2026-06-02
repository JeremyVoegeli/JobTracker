function FilterBar( {activeFilter, setActiveFilter} ){
    const statuses = ["Applied", "Assessment", "Phone Screen", "Interview", "Offer", "Rejected", "Withdrawn", "All"];
    const statusColors = {
    'Applied': 'border-sky-300',
    'Assessment': 'border-violet-300',
    'Phone Screen': 'border-amber-300',
    'Interview': 'border-orange-500',
    'Offer': 'border-green-500',
    'Rejected': 'border-red-500',
    'Withdrawn': 'border-gray-500',
    'All': 'border-zinc-500'
};
    return (
        <div className="flex flex-col gap-2 bg-zinc-700 border-2 border-zinc-500 rounded-lg h-fit">
            <h3 className="text-white font-semibold text-center text-lg">Filter</h3>
            {statuses.map((status) => (
                <div className="px-1 py-1">
                    <button 
                        key={status}
                        onClick={() => setActiveFilter(status)}
                        className={`border-2 ${statusColors[status]} px-3 py-1 rounded-full text-sm w-3xs font-semibold cursor-pointer bg-zinc-600  ${activeFilter === status ? 'text-zinc-50 bg-linear-to-br from-zinc-100 via-zinc-500 to-zinc-800 from-1%' : 'text-zinc-300 hover:text-white hover:bg-zinc-500'}`}
                        >{status}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default FilterBar;