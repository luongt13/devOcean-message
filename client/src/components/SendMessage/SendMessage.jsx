import {useState, useEffect} from 'react'
import {createMessage} from "../../service/message"

export default function SendMessage(props) {
    console.log(props.users)
    const [message, setMessage] = useState({
        content: "",
        sender: "",
        receiver: ""
    })

    function handleChange(event) {
        setMessage((prevState) => ({
            ...prevState,
            content: event.target.value
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        await createMessage(message)
        props.setToggle()
    }
    //sender is user that is logged in...
    return (
        <form className="send-message" onChange={handleChange} onSubmit={handleSubmit}>
            <input type="text" value={message.content}placeholder="Type message..."/>
            <button type="submit">Send</button>
        </form>
    )
}
