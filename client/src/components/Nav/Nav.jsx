import {Link} from "react-router-dom"

export default function Nav(props) {
    console.log(props)
    return (
        <div>
            <Link to="/users">Community</Link>
            <Link to="/messages">Messages</Link>
            <Link to="/my-profile">My Profile</Link>
            <Link to="/sign-in">Sign out</Link>
        </div>
    )
}
// add an edit profile link ? 