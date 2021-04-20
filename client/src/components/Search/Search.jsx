import React from "react";

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
        <div>
            <label htmlFor='search'>Search</label>
            <input
                type='text'
                name='search'
                id='search'
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
}

export default Search;