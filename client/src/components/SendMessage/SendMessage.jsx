import {useState} from 'react'
import {createMessage} from "../../service/message"
import "./SendMessage.css"

export default function SendMessage(props) {
    console.log(props.users)
    //to be used to store receiver information
    let receive =[]
    //if there are users then find out who is not the user logged in
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
    //when user types message, update the receiver and message content
    function handleChange(event) {
        setMessage((prevState) => ({
            ...prevState,
            receiver: receiver,
            content: event.target.value
        }))
    }
    //when submit, create message 
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