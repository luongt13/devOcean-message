import './App.css'
import Nav from "./components/Nav/Nav.jsx"
import UserList from "./components/UserList/UserList.jsx"
import UserProfile from "./components/UserProfile/UserProfile.jsx"

import {Route} from "react-router-dom"
function App() {
  //edit profile
  //create message
  
  return (
    <div className="App">
      <Nav/>
      <Route>
        {/* sign in/sign up*/}
      </Route>
      <Route exact path="/users">
        <UserList />
      </Route>
      <Route path="/users/:id">
        <UserProfile />
      </Route>
      <Route>
        {/* message list*/}
      </Route>
      <Route>
        {/* message thread*/}
      </Route>
    </div>
  );
}

export default App;
