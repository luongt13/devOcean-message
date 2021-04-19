import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {getMessages} from "../../service/message"
import "./MessageDetails.css"

export default function MessageDetails() {
    const [messages, setMessages] = useState([])
    let {id} = useParams()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = await getMessages(id)
        setMessages(data.messages)
        console.log(data.messages)
    }

//sort messages>
//if sender is from user logged in then make it different somehow
    return (
        <>
            {messages.map(item => {
                return (
                    <div className="message-detail">
                    <p>{item.content}</p>
                    <h5>{item.sender.name}</h5>
                    </div>
                )
            })}
        </>
    )
}