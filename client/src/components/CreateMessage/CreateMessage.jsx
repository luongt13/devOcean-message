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
    let [name, setName] = useState("")
    let { id } = useParams()

    const [formInput, setFormInput] = useState({
        content: "",
        sender: id,
        receiver: "",
    })

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        let data = await getUsers()
        setUsers(data)
    }

    function handleClick(e) {
        let receiverId = e.target.id
        setFormInput((prevState) => ({
            ...prevState,
            receiver: receiverId
        }))
        setSearchTerm("")
    }

    function handleChange(event) {
        let {id, value} = event.target
        setFormInput((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        await createMessage(formInput)
        props.setToggle()
    }
    console.log(name)
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
                    <p onClick={handleClick} onClick={() => setName(user.name)}id={user._id} key={user.id}>
                    {user.name}
                    </p>
            )
        })}
         </div>
        </div>

        <form className="create-message" onChange={handleChange} onSubmit={handleSubmit}>
            <input value={name}/>
            <input id="content" type="text" value={formInput.content} placeholder="Type a message..." />
            <button type="submit">Send</button>
        </form>
        </div>
    )
}
