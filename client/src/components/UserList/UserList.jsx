import { useEffect, useState } from "react"
import { getUsers } from "../../service/user"
import { Link } from "react-router-dom";
import Search from "../../components/Search/Search.jsx"
import User from "../../components/User/User.jsx"
import "./UserList.css"

function UserList() {
  let [users, setUsers] = useState([])
  let [filteredUsers, setFilteredUsers] = useState([]);
  let [currentUser, setCurrentUser] = useState({});
  let [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    getData()
    window.scrollTo(0, 0)
  }, [])

  async function getData() {
    let data = await getUsers()
    setUsers(data)
  }

  function handleClick(e) {
    let found = users.find((user) => {
      return user.id === e.target.id
    })

    setCurrentUser(found)
    setSearchTerm("")
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
        </div>
      <div className="search-results">
        {searchTerm.length > 1 && filteredUsers.map((user) => {
          return (
            <Link className="result-button" to={`/users/${user._id}`} key={user._id}>
            <button className="result-button" onClick={handleClick} id={user.id} key={user.id}>
              <div>
                  <img className="avatar" src={user.imgURL} alt="avatar"/>
                  <div className="details">
                  <p className="name">{user.name}</p>
                  <p className="email">{user.job}</p>
                  </div>
              </div>
              </button>
              </Link>
          )
        })}
      </div>

      <div>
        <User currentUser={currentUser} />
      </div>

      <div className="container-div">
        {users.map((user) => {
          return (
            <div className="user-container" key={user._id}>
              <Link to={`/users/${user._id}`}>
                <img className="profile-pic" src={user.imgURL} height={150} width={150} alt="profile pic" />
              </Link>
              <Link to={`/users/${user._id}`}>
                <h3 className="user-name">{user.name}</h3>
              </Link>
              <div className="job-location">
                <p>{user.job}</p>              
                <p>{user.location}</p>
              </div>
            </div>
          )
        })}
        </div>
    </div>
  )

}

export default UserList