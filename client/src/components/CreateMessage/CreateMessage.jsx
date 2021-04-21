import {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'
import {createMessage} from "../../service/message"
import { getUsers } from "../../service/user"
import Search from "../Search/Search.jsx"
import "./CreateMessage.css"

export default function CreateMessage(props) {
    let [users, setUsers] = useState([])
    let [filteredUsers, setFilteredUsers] = useState([]);
    let [searchTerm, setSearchTerm] = useState("");
    let { id } = useParams()

    const [formInput, setFormInput] = useState({
        content: "",
        sender: id,
        receiver: "",
    })
    //get users for search feature
    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        let data = await getUsers()
        setUsers(data)
    }
    //when user clicks the user, it sets search box to name chosen
    function handleClick(e) {
        let {id, name} = e.target
        setFormInput((prevState) => ({
            ...prevState,
            receiver: id
        }))
        setSearchTerm(name)
    }
    //set form data on change of message box
    function handleChange(event) {
        let {id, value} = event.target
        setFormInput((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }
    //create message
    async function handleSubmit(event) {
        event.preventDefault()
        await createMessage(formInput)
        props.setToggle()
    }

    return (
        <div>
            <div className="search-bar">
                <Search
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                    setUsers={setUsers}
                    users={users}
                    setFilteredUsers={setFilteredUsers}
                />
                <div className="search-results">
                    {searchTerm.length > 1 && filteredUsers.map((user) => {
                        return (
                        <button onClick={handleClick} id={user._id} name={user.name} key={user.id}>
                        {user.name}
                        </button>
                        )
                    })}
                </div>
            </div>
            <form className="create-message" onChange={handleChange} onSubmit={handleSubmit}>
                <input id="content" type="text" value={formInput.content} placeholder="Type a message..." />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}
