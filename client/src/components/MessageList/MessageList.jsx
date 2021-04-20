import {useState, useEffect} from 'react'
import {useParams, Link} from "react-router-dom"
import {getConversations} from "../../service/message"
import {useToggle} from "../../hooks/useToggle"
import MessageItem from "../Message/MessageItem.jsx"
import CreateMessage from "../CreateMessage/CreateMessage.jsx"
import "./MessageList.css"
export default function MessageList() {
    const [conversations, setConversations] = useState()
    const [refresh, setRefresh] = useState(false)
    const [isToggled, toggle] = useToggle()
    let {id} = useParams()

    useEffect(() => {
        getUserCon()
    }, [refresh])

    const getUserCon = async () => {
        const data = await getConversations(id)
        setConversations(data.conversations)
    }
    // sort the array by date????
    return (
        <div className="message-list">
            <h1>Messages</h1>
            <div className="buttons">
                <button onClick={() => setRefresh((prevState) => !prevState)}>Refresh</button>
                <button onClick={toggle}>Start A Conversation</button>
            </div>
            
            {isToggled ? <CreateMessage setToggle={toggle}/> : null}

            {conversations ? conversations.map(item => {
                return (
                    <div key={item._id} className="message-list">
                    <Link to={`/details/${item._id}`}><MessageItem key={item._id} conversation={item} userId={id}/></Link>
                    </div>
                )
            }): <h1>No Conversations</h1>}
        </div>
    )
}