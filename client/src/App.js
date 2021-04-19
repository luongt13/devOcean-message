import './App.css'
import Nav from "./components/Nav/Nav.jsx"

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
