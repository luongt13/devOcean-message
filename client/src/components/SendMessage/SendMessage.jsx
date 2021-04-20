import {useState} from 'react'
import {createMessage} from "../../service/message"
import "./SendMessage.css"

export default function SendMessage(props) {

    let sender = "6079fbc876ea7f675d84f734"
    let receiver = "6079fbc876ea7f675d84f735"
    
    let defaultInput = {
        content: "",
        sender: sender,
        receiver: receiver
    }
    const [message, setMessage] = useState(defaultInput)
    
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
        setMessage(defaultInput)
    }
    //sender is user that is logged in...
    return (
        <form className="send-message" onChange={handleChange} onSubmit={handleSubmit}>
            <textarea type="text" id="message" value={message.content}placeholder="Type a message..."/>
            <button type="submit">Send</button>
        </form>
    )
}