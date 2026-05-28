function Header({ onAdd }){
    return (
        <div className="flex mb-6">
            <h1 className="text-5xl font-bold mr-10 text-white text-shadow-sm/50 text-shadow-indigo-300">Job Tracker</h1>
            <button className="" onClick={() => onAdd()}>Add Application</button>
        </div>
    );
}

export default Header;