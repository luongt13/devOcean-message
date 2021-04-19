import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {getMessages} from "../../service/message"
import SendMessage from "../SendMessage/SendMessage.jsx"
import "./MessageDetails.css"
import {useToggle} from "../../hooks/useToggle"

export default function MessageDetails() {
    const [isToggled, toggle] = useToggle(false)

    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState()
    let {id} = useParams()

    useEffect(() => {
        getData()
    }, [isToggled])

    const getData = async () => {
        const data = await getMessages(id)
        setMessages(data.messages)
        setUsers(data.users)
    }
//sort messages>
//if sender is from user logged in then make it different somehow
    return (
        <div className="message-page">
            {messages.map(item => {
                return (
                    <div className="message-detail" key={item._id}>
                    <p>{item.content}</p>
                    <h5>{item.sender.name}</h5>
                    </div>
                )
            })}
            <SendMessage users={users} setToggle={toggle}/>
        </div>
    )
}