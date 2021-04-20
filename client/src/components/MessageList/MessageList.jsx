import {useState, useEffect} from 'react'
import {useParams, Link} from "react-router-dom"
import {getConversations} from "../../service/message"
import {useToggle} from "../../hooks/useToggle"
import MessageItem from "../Message/MessageItem.jsx"
import CreateMessage from "../CreateMessage/CreateMessage.jsx"
import MessageDetails from '../MessageDetails/MessageDetails'
import SendMessage from "../SendMessage/SendMessage.jsx"
import Test from "./Test.jsx"

export default function MessageList() {
const [test, setTest] = useState()
const [users, setUsers] = useState()
const [showForm, setShowForm] = useState(true)
const [reload, setReload] = useState(false)

    const [conversations, setConversations] = useState()
    const [isToggled, toggle] = useToggle()
    let {id} = useParams()
    useEffect(() => {
        getUserCon()
    }, [])

    const getUserCon = async () => {
        const data = await getConversations(id)
        setConversations(data.conversations)
    }

    function renderData() {
        if (reload || !reload) {
                if (test && !showForm) {
                    return (
                    <>
                    <div className="test-this">
                    {test.map(item => {
                        return (
                            <div className="message-detail test-detail" key={item._id}>
                            <p>{item.content}</p>
                            <h5>{item.sender.name}</h5>
                            </div>
                        )
                    })}
                    </div> 
                    <SendMessage users={users} setToggle={toggle} setReload={setReload}/> 
                    </>
                    )
                } else {
                    <CreateMessage setToggle={toggle}/> 
                }        
        }
    }
    return (
        <div className="message-list">
            {/* <h1>Messages</h1> */}
            <button onClick={() => setShowForm(prevState => !prevState)}>Start A Conversation</button>
            {/* {isToggled ? <CreateMessage setToggle={toggle}/> : null}
            {conversations ? conversations.map(item => {
                return (
                    <div key={item._id} >
                    <Link to={`/details/${item._id}`}><MessageItem key={item._id}  conversation={item}/></Link>
                    </div>
                )
            }): <h1>No Conversations</h1>} */}

        <div className="test-list">
            {conversations ? conversations.map(item => {
                return (
                    <div key={item._id} >
                    <Test key={item._id} setToggle={toggle} setMessage={setTest} conversation={item} setUsers={setUsers} setShowForm={setShowForm} reload={reload}/>
                    </div>
                )
            }): <h1>No Conversations</h1>}
        </div>

<div className="test-page">
    {renderData()}
    {showForm ? <CreateMessage setToggle={toggle}/> : null}
    {/* {reload  && test.length > 0 ?
        <>
        <div className="test-this">
        {test.map(item => {
            return (
                <div className="message-detail test-detail" key={item._id}>
                <p>{item.content}</p>
                <h5>{item.sender.name}</h5>
                </div>
            )
        })}
        </div>
        <SendMessage users={users} setToggle={toggle} setReload={setReload}/> 
        </>
        : <CreateMessage setToggle={toggle}/> 
    } */}
</div>
        </div>
    )
}
