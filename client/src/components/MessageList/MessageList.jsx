import {useState, useEffect} from 'react'
import {useParams, Link} from "react-router-dom"
import {getConversations} from "../../service/message"
import MessageItem from "../Message/MessageItem.jsx"
import {useToggle} from "../../hooks/useToggle"

export default function MessageList() {
    let [conversations, setConversations] = useState()
    let {id} = useParams()

    useEffect(() => {
        getUserCon()
    }, [])

    const getUserCon = async () => {
        const data = await getConversations(id)
        setConversations(data.conversations)
    }
    // sort the array by date????
    return (
        <div className="message-list">
            <h1>Messages</h1>
            {conversations ? conversations.map(item => {
                return (
                    <div>
                    <Link to={`/details/${item._id}`}><MessageItem key={item._id} conversation={item}/></Link>
                    </div>
                )
            }): <h1>No Conversations</h1>}
        </div>
    )
}
