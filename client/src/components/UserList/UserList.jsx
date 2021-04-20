import { useEffect, useState } from "react"
import { getUsers } from "../../service/user"
import { Link } from "react-router-dom";
import Search from "../../components/Search/Search.jsx"
import User from "../../components/User/User.jsx"

function UserList() {
  let [users, setUsers] = useState([])
  let [filteredUsers, setFilteredUsers] = useState([]);
  let [currentUser, setCurrentUser] = useState({});
  let [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (
      filteredUsers.length === 0 &&
      searchTerm === "" &&
      users.length !== 0 
    ) {
      setFilteredUsers(users)
    }
  }, [filteredUsers, searchTerm, users])

  async function getData() {
    let data = await getUsers()
    console.log(data)
    setUsers(data)
  }

  function handleClick(e) {
    let found = users.find((user) => {
      return user.id === e.target.id
    })

    setCurrentUser(found)
    setSearchTerm("")
    setFilteredUsers(users)
  }

  return (
    <div>
      <div className="search-bar">
        <Search
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          setUsers={setUsers}
          users={users}
          setFilteredUsers={setFilteredUsers}
        />
        {filteredUsers.map((user) => {
          return (
            <p onClick={handleClick} id={user.id} key={user.id}>
              {user.name}
            </p>
          )
        })}
      </div>

      <div>
        <User currentUser={currentUser} />
      </div>

      <div>
        {users.map((user) => {
          return (
            <div className="user-container" key={user._id}>
              <Link to={`/users/${user._id}`} key={user._id}>
                <img src={user.imgURL} height={150} width={150} alt="profile pic" />
                <h3>{user.name}</h3>
              </Link>
                <p>{user.job}</p>
            </div>
          )
        })}
        </div>
    </div>
  )

}

export default UserList