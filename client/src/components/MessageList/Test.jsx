import {useEffect, useState} from 'react'
// import {useParams} from "react-router-dom"
import {getMessages} from "../../service/message"
import SendMessage from "../SendMessage/SendMessage.jsx"
// import MessageList from "../MessageList/MessageList.jsx"
// import "./MessageDetails.css"
import {useToggle} from "../../hooks/useToggle"
import "./Test.css"

export default function Test(props) {
    // console.log(props.conversation)
    const [isToggled, toggle] = useToggle(false)

    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState()
    // let {id} = useParams()
    // useEffect(() => {
    //     getData()
    // }, [isToggled])

    const getData = async () => {
        const data = await getMessages(props.conversation._id)
        setMessages(data.messages)
        setUsers(data.users)
    }

    function handleClick() {
        getData()
        toggle()
    }

console.log(messages)
//sort messages>
//if sender is from user logged in then make it different somehow
    return (
<>
        <div className="test-item">
        {props.conversation.users.map(user => {
            return (

                <div onClick={handleClick}>
                    <h4>{user.name}</h4>
                    <h5>{user.email}</h5>
                </div>
            )
        })}
    </div>
    <div className="test-page">

        {isToggled && messages.length > 0 ?  
            <>
            {messages.map(item => {
                return (
                    <div className="message-detail" key={item._id}>
                    <p>{item.content}</p>
                    <h5>{item.sender.name}</h5>
                    </div>
                )
            })}
            <SendMessage users={users} setToggle={toggle}/> 
            </>
            : null
        }
    </div>

    </>    
    )
}