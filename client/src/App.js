import './App.css'
import Nav from "./components/Nav/Nav.jsx"
import UserList from "./components/UserList/UserList.jsx"
import UserProfile from "./components/UserProfile/UserProfile.jsx"
import MessageList from "./components/MessageList/MessageList.jsx"
import MessageDetails from "./components/MessageDetails/MessageDetails.jsx"
import UpdateUser from "./components/UpdateUser/UpdateUser.jsx"

import { useState, useEffect } from "react"
import { verifyUser, findUser } from "./service/user"
import SignUp from "./components/SignUp/SignUp.jsx"
import SignIn from "./components/SignIn/SignIn.jsx"
import {Route, useHistory} from "react-router-dom"

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [email, setEmail] = useState(null)
  const [userData, setUserData] = useState(null)

  let history = useHistory()
  const logout = async () => {
    await localStorage.clear()
    setCurrentUser(null)
    history.push("/sign-in")
  }

  useEffect(() => {
    requestVerification()
  }, [])

  const requestVerification = async () => {
    const user = await verifyUser()
    setCurrentUser(user)
    setEmail(user.email)
  }
console.log(email)
  async function getUserData() {
    let res = await findUser({email: email})
    console.log(res)
    setUserData(res._id)
  }
    if(email) {
      getUserData()
    }

    if(userData) {
      history.push("/users")
    }

  return (
    <div className="App">
      <Nav currentUser={currentUser} logout={logout} userData={userData}/>
      <Route path="/sign-in">
        <SignIn setCurrentUser={setCurrentUser} />
      </Route>
      <Route path="/sign-up">
        <SignUp setCurrentUser={setCurrentUser} />
      </Route>
      <Route exact path="/users">
        <UserList />
      </Route>
      <Route path="/users/:id">
        <UserProfile />
      </Route>
      <Route path="/update-user/:id">
        <UpdateUser userData={userData} />
      </Route>
      <Route path="/messages/:id">
        <MessageList/>
      </Route>
      <Route path="/details/:id">
        <MessageDetails userData={userData}/>
      </Route>
    </div>
  )
}

export default App;
