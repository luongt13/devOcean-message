import {useState} from 'react'
import { useParams } from 'react-router-dom'
import {createMessage} from "../../service/message"
import Search from "../Search/Search.jsx"
import "./CreateMessage.css"

export default function CreateMessage(props) {
    let {id} = useParams()

    const [formInput, setFormInput] = useState({
        content: "",
        sender: id,
        receiver: "",
    })


    // function handleSearch() {

    // }

    function handleChange(event) {
        let {id, value} = event.target
        setFormInput((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        props.setToggle()
    }
    return (
        <form className="create-message" onChange={handleChange} onSubmit={handleSubmit}>
            <div className="input">
                <Search/>
            </div>
            {/* <input name="receiver" value={formInput.receiver} type="text" onChange={handleSearch}  placeholder="To"/> */}
            <div className="input">
                    <input id="content" type="text" value={formInput.content} placeholder="Type a message..." />
                <button type="submit">Send</button>
            </div> 
        </form>
    )
}
