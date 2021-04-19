import {Link} from "react-router-dom"

export default function Nav() {
    return (
        <div>
            <Link to="/">Community</Link>
            <Link to="/messages">Messages</Link>
            <Link to="/my-profile">My Profile</Link>
            <Link>Sign out</Link>
        </div>
    )
}