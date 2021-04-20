import './App.css'
import Nav from "./components/Nav/Nav.jsx"
import UserList from "./components/UserList/UserList.jsx"
import UserProfile from "./components/UserProfile/UserProfile.jsx"
import MessageList from "./components/MessageList/MessageList.jsx"
import MessageDetails from "./components/MessageDetails/MessageDetails.jsx"


//needed for imports 
import { useState, useEffect } from "react";
import { verifyUser } from "./services/user";
import SignUp from "./components/SignUp/SignUp.js";
import SignIn from "./components/SignIn/SignIn.js";

import {Route} from "react-router-dom"
function App() {
  //edit profile
  //create message
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    requestVerification();
  }, []);

  const requestVerification = async () => {
    const user = await verifyUser();
    setCurrentUser(user);
  };
  
  return (
    <div className="App">

      {/* we need to add current user to nav for the class example to work */}
      <Nav/>
      <Route path="/sign-in">
        <SignIn setCurrentUser={setCurrentUser} />
      </Route>
      <Route path="/sign-up">
        <SignUp setCurrentUser={setCurrentUser} />
      </Route>
      {/* potential user edit route */}
      {/* <Route path="/users/:id">
          {renderEdit()}
        </Route> */}
      <Route exact path="/users">
        <UserList />
      </Route>
      <Route path="/users/:id">
        <UserProfile />
      </Route>
      <Route exact path="/messages/:id">
        <MessageList/>
      </Route>
      <Route exact path="/details/:id">
        <MessageDetails/>
      </Route>
    </div>
  );
}

export default App
