function Header({ onAdd, jobCount }){
    return (
        <div className="flex mb-6">
            <h1 className="text-5xl font-bold mr-10 text-white text-shadow-sm/50 text-shadow-indigo-300">Job Tracker</h1>
            <button className="bg-gradient-to-br from-blue-200 via-indigo-500 to-slate-900 text-white font-semibold px-4 py-2 rounded-full hover:opacity-90 cursor-pointer" onClick={() => onAdd()}>Add Application</button>
            <h2 className="flex items-center px-3 text-zinc-400">Total Job Count: {jobCount}</h2>
        </div>
    );
}

export default Header;