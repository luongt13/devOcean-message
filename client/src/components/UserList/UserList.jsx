import { useEffect, useState } from "react"
import { getUsers } from "../../service/user"
import { Link } from "react-router-dom";
import Fuse from "fuse.js"

function UserList() {
  // let [query, setQuery] = useState('')
  let [users, setUsers] = useState([])

  // const fuse = new Fuse(users, {
  //   keys: [
  //     'name',
  //     'job',
  //     'location'
  //   ],
  //   includeScore: true
  // })

  // const results = fuse.search(query)
  // const userResults = query ? results.map(result => result.item) : users

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    let data = await getUsers()
    console.log(data)
    setUsers(data)
  }

  // function handleChange({ currentTarget }) {
  //   const { value } = currentTarget
  //   setQuery(value)
  // }


  return (
    <div>
      <label htmlFor='search'>Search</label>
      <input
        type='text'
        name='search'
        id='search'
        // value={query}
        // onChange={handleChange}
      />

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