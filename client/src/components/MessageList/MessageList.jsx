import {useState, useEffect} from 'react'
import {useParams, Link} from "react-router-dom"
import {getConversations} from "../../service/message"
import {useToggle} from "../../hooks/useToggle"
import MessageItem from "../Message/MessageItem.jsx"
import CreateMessage from "../CreateMessage/CreateMessage.jsx"
import "./MessageList.css"

export default function MessageList() {
    const [conversations, setConversations] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [isToggled, toggle] = useToggle(false)
    let {id} = useParams()
    //get the conversations
    useEffect(() => {
        getUserCon()
        window.scrollTo(0, 0)
          // eslint-disable-next-line
    }, [refresh, isToggled])
    
    const getUserCon = async () => {
        const data = await getConversations(id)
        setConversations(data.conversations)
    }
    return (
        <div className="message-list">
            <div className="buttons">
                <button className="add" onClick={toggle} title="start a conversation"><img src="https://cdn.iconscout.com/icon/free/png-512/add-new-1439785-1214356.png" alt="add button"/>Start A Conversation</button>
                <button title="refresh" className="refresh"onClick={() => setRefresh((prevState) => !prevState)}><img src="https://image.flaticon.com/icons/png/512/61/61444.png" alt="refresh button"/>Refresh</button>
            </div>
            
            {isToggled ? <CreateMessage setToggle={toggle}/> : null}

            {conversations.length > 1? conversations.map(item => {
                return (
                    <div key={item._id} className="message-list">
                    <Link to={`/details/${item._id}`}><MessageItem key={item._id} conversation={item} userId={id}/></Link>
                    </div>
                )
            }): []}
        </div>
    )
}