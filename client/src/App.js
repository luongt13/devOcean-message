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
import {Redirect, Route, useHistory} from "react-router-dom"

function App() {
  //set current user data and user id 
  const [currentUser, setCurrentUser] = useState(null)
  const [userData, setUserData] = useState(null)
  let history = useHistory()
  //handle logout
  const logout = async () => {
    await localStorage.clear()
    setCurrentUser(null)
    setUserData(null)
    history.push("/sign-in")
  }
  //verify user
  useEffect(() => {
    requestVerification()
  }, [])
  //invoke get data (user id) when currentUser changes and if its true
  useEffect(() => {
    if(currentUser) {
      getUserData()
    }
  }, [currentUser])
  //verify user and set to current user
  const requestVerification = async () => {
    const user = await verifyUser()
    setCurrentUser(user)
  }
  //get user id of user that is logged in based on their email
  async function getUserData() {
    let res = await findUser({email: currentUser.email})
    setUserData(res._id)
  }

  const renderEdit = () => {
    if(currentUser) {
      return <UpdateUser userData={userData}/>
    } else {
      return <Redirect to="/sign-in"/>
    }
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
        <UserProfile userData={userData}/>
      </Route>
      <Route path="/update-user/:id">
        {/* <UpdateUser /> */}
        {renderEdit()}
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

export default App