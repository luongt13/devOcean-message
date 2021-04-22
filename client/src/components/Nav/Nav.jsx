import {Link} from "react-router-dom"
import "./Nav.css"


export default function Nav(props) {
    let id = props.userData
    function displayNav() {
        if(props.currentUser) {
            return (
                <div className="links">
                <Link to="/users">Community</Link>
                <Link to={`/messages/${id}`}>Messages</Link>
                <Link to={`/users/${id}`}>My Profile</Link>
                <button onClick={props.logout}>Sign out</button>
                </div>
            )
        } else {
            return (
                <div className="links">
                    <Link to="/">Sign In</Link>
                    <Link to="/sign-up">Sign Up</Link>
                </div>
            )
        }
    }
    return (
        <div className="nav">
        <img className="logo" src="https://res.cloudinary.com/dbmxg3su8/image/upload/v1619026818/Screen_Shot_2021-04-21_at_1.34.18_PM_tlxzge.png" alt="logo" width="300" height="80"></img>
        {displayNav()}
        </div>
    )
}