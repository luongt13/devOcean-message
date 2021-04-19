import React from "react"
import { useEffect, useState } from "react"
import { getUser } from "../../service/user.js"
import { useParams } from "react-router-dom"

export default function UserProfile() {
  let [user, setUser] = useState({})
  let { id } = useParams()

  useEffect(() => {
    getUserData();
  }, []);
  
  async function getUserData() {
    let data = await getUser(id)
    console.log(data)
    setUser(data)
  }

  return (
    <div>
        <div>
        <img src={user.imgURL} height={350} width={350} alt="profile pic" />
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <p>{user.location}</p>
        <p>{user.job}</p>
        <p>{user.languages}</p>
      </div>
      <p>{user.about}</p>
    </div>
  )
}
