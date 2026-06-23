function SearchBar({ searchText, searchField, setSearchText, setSearchField }){

    return (
        <div>
            <input value={searchText} onChange={(event) => setSearchText(event.target.value)}></input>
            <select name="searchField" value={searchField} onChange={(event) => setSearchField(event.target.value)}>
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