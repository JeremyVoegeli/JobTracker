function SearchBar({ searchText, searchField, setSearchText, setSearchField }){

    return (
        <div className="flex items-center px-2 gap-2">
            <input value={searchText} placeholder="Search..." onChange={(event) => setSearchText(event.target.value)} className="bg-zinc-700 border-2 border-zinc-600 rounded-md text-white px-1"></input>
            <select name="searchField" value={searchField} onChange={(event) => setSearchField(event.target.value)} className="p-1 bg-linear-to-tl from-indigo-700 to-blue-200 text-indigo-50 rounded-md">
                <option value="jobTitle">Job Title</option>
                <option value="company">Company</option>
                <option value="location">Location</option>
                <option value="site">Site</option>
                <option value="notes">Notes</option>
            </select>
        </div>
    )
}

export default SearchBar;