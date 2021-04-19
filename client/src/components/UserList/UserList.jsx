import { useEffect, useState } from "react"
import { getUsers } from "../../service/user"
import { Link } from "react-router-dom";

function UserList() {
  let [users, setUsers] = useState([])

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    let data = await getUsers()
    console.log(data)
    setUsers(data)
  }

  return (
    <div>
      {users.map((user) => {
        return (
          <div className="user-container">
            <Link to={`/users/${user._id}`}>
              <img src={user.imgURL} height={150} width={150} alt="profile pic" />
              <h3>{user.name}</h3>
            </Link>
            <p>{user.job}</p>
          </div>
        )
      })}
    </div>
  )



}

export default UserList