import React from "react";

function User(props) {
    let user = props.currentUser ? props.currentUser : {};
    return (
        <div>
            <h2>{user.name}</h2>
            <h4>{user.email}</h4>
            <h5>{user.job}</h5>
        </div>
    );
}

export default User;