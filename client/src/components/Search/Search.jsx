import React from "react";
import "./Search.css"

function Search(props) {
    // destructuring props so I dont have to call props before each item
    let { searchTerm, setSearchTerm, setFilteredUsers, users } = props;

    function handleChange(event) {
        setSearchTerm(event.target.value);
        setFilteredUsers(
            users.filter((user) =>
                user.name
                    .toLowerCase()
                    .replace(/ /g, "")
                    .includes(searchTerm.replace(/ /g, ""))
            )
        );
    }
    // Returning a label and input that have their value and onchange controlled by the search term
    // state we set in SongList.jsx
    return (
        <div className="search-input">
            <input
                type='text'
                name='search'
                id='search'
                autoComplete="off"
                placeholder='Search user here...'
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
}

export default Search;