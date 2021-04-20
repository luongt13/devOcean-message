import {useState} from 'react'
import {createMessage} from "../../service/message"
import Search from "../Search/Search.jsx"

export default function CreateMessage(props) {
    const [formInput, setFormInput] = useState({
        content: "",
        sender: "",
        receiver: "",
    })

    // function handleSearch() {

    // }

    function handleChange(event) {
        let {name, value} = event.target
        setFormInput((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        props.setToggle()
    }
    return (
        <form onChange={handleChange} onSubmit={handleSubmit}>
            <Search/>
            {/* <input name="receiver" value={formInput.receiver} type="text" onChange={handleSearch}  placeholder="To"/> */}

            <input name="content" value={formInput.content} type="text"  placeholder="Type a message..."/>
            <input name="sender" value={formInput.sender} placeholder="From"/>
            <button type="submit">Send</button>
        </form>
    )
}
