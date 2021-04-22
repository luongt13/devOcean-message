import { useEffect, useState } from "react"
import { getUser } from "../../service/user.js"
import { useParams, useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import {createMessage} from "../../service/message"
import "./UserProfile.css"

export default function UserProfile(props) {
  let [user, setUser] = useState({})
  const [found, setFound] = useState()
  let { id } = useParams()
  let history = useHistory()
  let userLogged = props.userData

  useEffect(() => {
    getUserData();
  }, [id]);

  useEffect(() => {
    if(found) {
      history.push(`/details/${found._id}`)
    }
  }, [found])

  async function getUserData() {
    let data = await getUser(id)
    setUser(data)
  }

  async function handleClick(){
    let body = {
      sender: userLogged,
      receiver: id,
    }
    let created = await createMessage(body)
    setFound(created)
  }

  const renderEditButton = () => {
    if (userLogged === id) {
      return (
        <Link to={`/update-user/${id}`} className="user-btn">
          <img  src="https://cdn0.iconfinder.com/data/icons/glyphpack/45/edit-alt-512.png" height={30} width={30} alt={"edit profile icon"} />
        </Link>
      )
    } else {
      return (
        <img className="user-btn" onClick={handleClick} src="http://cdn.onlinewebfonts.com/svg/img_125115.png" height={40} width={40} alt={"message icon"} />
      )
    }
  }
    return (
    <div className="user-info-contain">
        {renderEditButton()}
        <div className="user-info">
          <img className="user-image" src={user.imgURL ? user.imgURL : "http://images.forbes.com/media/lists/people/silhouette_485x340.jpg"} height={350} width={350} alt="profile pic"/>
          <div className="user-details">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p><strong>Location: </strong>{user.location}</p>
            <p><strong>Job Title: </strong>{user.job}</p>
            <p><strong>Languages: </strong>{user.languages}</p>
            <a href={`${user.professionalLink}`} target="_blank">
              <img src="https://image.flaticon.com/icons/png/512/61/61109.png" height={40} width={40} alt={"linkedin icon"}/>
            </a>
          </div>
      </div>
      <p className="about"><strong>About Me:</strong> {user.about}</p>
    </div>
  )
}