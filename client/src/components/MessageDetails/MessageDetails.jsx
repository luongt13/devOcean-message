import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {deleteMessage, getMessages} from "../../service/message"
import SendMessage from "../SendMessage/SendMessage.jsx"
import "./MessageDetails.css"
import {useToggle} from "../../hooks/useToggle"

export default function MessageDetails(props) {
    const [isToggled, toggle] = useToggle(false)
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState()
    const [displayName, setDisplayName] = useState("")
    let {id} = useParams()
    let receiveName = []

    useEffect(() => {
        getData()
    }, [isToggled])
    useEffect(() => {
        setDisplayName(receiveName.toString())
    }, [receiveName])

    const getData = async () => {
        const data = await getMessages(id)
        setMessages(data.messages)
        setUsers(data.users)
    }

    if(users) {
        users.forEach((item) => {
            if(item._id !== props.userData) {
                receiveName.push(item.name)
            }
        })
    }

    async function handleDelete(item) {
        let message = item._id
        deleteMessage(message)
        getData()
    }
//sort messages>
//if sender is from user logged in then make it different somehow
    return (
        <div className="message-page">
            <h3>{displayName}</h3>
            <div className="messages">
            {messages.map(item => {
                if (item.sender._id === props.userData) {
                    return (
                        <div className="message-detail user" key={item._id}>
                            <button className="delete-button" onClick={() => handleDelete(item)} title="delete message"> X Delete</button>
                            <p className="body-text">{item.content}</p>
                            <h6>{item.sender.name}</h6>
                        </div>
                    )
                } else {
                    return (
                        <div className="message-detail other-user" key={item._id}>
                        <p className="body-text">{item.content}</p>
                        <h6>{item.sender.name}</h6>
                        </div>
                    )
                }
            })}
        </div>
        <div className="send-bar">
            <SendMessage users={users} setToggle={toggle} userData={props.userData}/>
            </div>
        </div>
    )
}