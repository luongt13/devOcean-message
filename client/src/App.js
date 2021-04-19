import './App.css'
import Nav from "./components/Nav/Nav.jsx"
import MessageList from "./components/MessageList/MessageList.jsx"
import MessageDetails from "./components/MessageDetails/MessageDetails.jsx"

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
      <Route>
        {/* user list : home page*/}
      </Route>
      <Route>
        {/* user profile*/}
      </Route>
      <Route path="/messages/:id">
        <MessageList/>
      </Route>
      <Route path="/details/:id">
        <MessageDetails/>
      </Route>
    </div>
  );
}

export default App;
