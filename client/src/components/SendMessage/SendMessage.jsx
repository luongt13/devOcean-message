import {useState} from 'react'
import {useParams} from "react-router-dom"
import {createMessage} from "../../service/message"
import "./SendMessage.css"

export default function SendMessage(props) {
    let receive =[]
    if(props.users) {
        props.users.forEach((item) => {
            if(item._id !== props.userData) {
                receive.push(item._id)
            }
        })
    }
    let receiver = receive.toString()
    let sender = props.userData

    let defaultInput = {
        content: "",
        sender: sender,
        receiver: receiver,
    }
    const [message, setMessage] = useState(defaultInput)

    function handleChange(event) {
        setMessage((prevState) => ({
            ...prevState,
            receiver: receiver,
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