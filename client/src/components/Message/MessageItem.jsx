import "./MessageItem.css"

export default function MessageItem(props) {
    console.log(props.conversation)
    return (
        <div className="message-item">
            {props.conversation.users.map(user => {
                return (
                    <div>
                        <h4>{user.name}</h4>
                        <h5>{user.email}</h5>
                    </div>
                )
            })}
        </div>
    )
}
