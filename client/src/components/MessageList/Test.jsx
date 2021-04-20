import {useEffect, useState} from 'react'
import {getMessages} from "../../service/message"
import SendMessage from "../SendMessage/SendMessage.jsx"

import "./Test.css"

export default function Test(props) {
    console.log(props.reload)
 const [changeData, setChangeData] = useState(false)
useEffect(() => {
    getData()
}, [changeData, props.reload])

    const getData = async () => {
        const data = await getMessages(props.conversation._id)
        console.log(data.messages)
        props.setMessage(data.messages)
        props.setUsers(data.users)
    }

    function handleClick() {
        setChangeData(prevState => !prevState)
        // props.setTest(messages)
        props.setShowForm(prevState => prevState === "false")
    }
    

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
    </>    
    )
}