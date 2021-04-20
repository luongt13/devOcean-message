import {useState, useEffect} from 'react'
import {useParams, Link} from "react-router-dom"
import {getConversations} from "../../service/message"
import {useToggle} from "../../hooks/useToggle"
import MessageItem from "../Message/MessageItem.jsx"
import CreateMessage from "../CreateMessage/CreateMessage.jsx"
import MessageDetails from '../MessageDetails/MessageDetails'
import Test from "./Test.jsx"

export default function MessageList() {
const [test, setTest] = useState()

    const [conversations, setConversations] = useState()
    const [isToggled, toggle] = useToggle()
    let {id} = useParams()
console.log(test)
    useEffect(() => {
        getUserCon()
    }, [])

    const getUserCon = async () => {
        const data = await getConversations(id)
        setConversations(data.conversations)
    }
    console.log(conversations)
    // sort the array by date????
    return (
        <div className="message-list">
            <h1>Messages</h1>
            <button onClick={toggle}>Start A Conversation</button>
            <div>
       <div className="test-page">

        {isToggled && test.length > 0 ?  
            <>
            {test.map(item => {
                return (
                    <div className="message-detail" key={item._id}>
                    <p>{item.content}</p>
                    <h5>{item.sender.name}</h5>
                    </div>
                )
            })}
            {/* <SendMessage users={users} setToggle={toggle}/>  */}
            </>
            : null
        }
    </div>
            </div>
        
            {/* {isToggled ? <CreateMessage setToggle={toggle}/> : null}
            {conversations ? conversations.map(item => {
                return (
                    <div key={item._id} >
                    <Link to={`/details/${item._id}`}><MessageItem key={item._id}  conversation={item}/></Link>
                    </div>
                )
            }): <h1>No Conversations</h1>} */}

            
            {conversations ? conversations.map(item => {
                return (
                    <div key={item._id} >
                    <Test key={item._id}  setToggle={toggle} setTest={setTest} conversation={item}/>
                    </div>
                )
            }): <h1>No Conversations</h1>}
        </div>
    )
}
