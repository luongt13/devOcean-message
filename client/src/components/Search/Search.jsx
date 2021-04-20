import {useState} from 'react'
// import {findUser} from "../../service/message"

export default function Search() {
const [searchField, setSearchField] = useState("")

    // function handleChange(event) {
    //     setSearchField(event.target.value)
    // }

    // async function handleSearch() {
    //     let res = await findUser(searchField)
    //     console.log(res)
    // }

    return (
        <>
        {/* <input placeholder="Search user..." value={searchField} onChange={handleChange}/>
        <button onClick="handleSearch">Search</button> */}
        </>
    )
}
