import {Link} from "react-router-dom"

export default function Nav(props) {
    let id = props.userData
    function displayNav() {
        if(props.currentUser) {
            return (
                <div className="nav">
                <Link to="/users">Community</Link>
                <Link to={`/messages/${id}`}>Messages</Link>
                <Link to={`/users/${id}`}>My Profile</Link>
                <button onClick={props.logout}>Sign out</button>
                </div>
            )
        } else {
            return (
                <div className="nav">
                    <Link to="/sign-in">Sign In</Link>
                    <Link to="/sign-up">Sign Up</Link>
                </div>
            )
        }
    }
    return (
        <>
        <h2>devOceans</h2>
        {displayNav()}
        </>
    )
}