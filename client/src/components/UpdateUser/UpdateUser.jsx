import { useState, useEffect } from "react";
import { updateUser } from "../../service/user"
import { useParams, useHistory } from "react-router-dom"
import { getUser } from "../../service/user.js"


export default function UpdateUser(props) {
  let { id } = useParams()
  let [user, setUser] = useState({})

  useEffect(() => {
    getUserData();
      // eslint-disable-next-line
  }, [id]);
  
  async function getUserData() {
    let data = await getUser(id)
    setUser(data)
  }
  
  const defaultInput = {
    name:  user.name ,
    email: user.email,
    imgURL: user.imgUrl,
    location: user.location,
    job: user.job,
    languages: user.languages,
    professionalLink: user.professionalLink,
    about: user.about,
  };

  const history = useHistory();
  const [input, setInput] = useState(defaultInput);

  const handleChange = (event) => {
    let { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let id = props.userData
    await updateUser(id, input);
    setInput(input)
    history.push(`/users/${id}`)
  };

  return (
    <div>
      <h3 className="form-title">Edit Profile</h3>
      <div className="form-container">
      <form className="sign-up-form" onChange={handleChange} onSubmit={handleSubmit}>
        <label className="label">Name</label>
          <input
          className = "input"
          name="name"
          placeholder="Enter name..."
          defaultValue={user.name}
        />
        <label className="label">Email</label>
          <input
          className = "input"
          type="email"
          name="email"
          placeholder="Enter email..."
          defaultValue={user.email} 
          required 
        />
        <label className="label">Profile Image</label>
          <input
          className = "input"
          type="text"
          name="imgURL"
          placeholder="Enter URL for image..."
          defaultValue={user.imgURL}
        />
        <label className="label">Location</label>
          <input
          className = "input"
          type="text"
          name="location"
          placeholder="Enter location..."
          defaultValue={user.location}  
        />
        <label className="label">Job Title</label>
          <input
          className = "input"
          type="text"
          name="job"
          placeholder="Enter job title..."
          defaultValue={user.job}  
        />
        <label className="label">Languages</label>
          <input
          className = "input"
          type="text"
          name="languages"
          placeholder="Enter languages..."
          defaultValue={user.languages}  
        />
        <label className="label">Professional Link</label>
          <input
          className = "input"
          type="text"
          name="professionalLink"
          placeholder="Enter professional link URL..."
          defaultValue={user.professionalLink}  
        /> 
        <label className="label">About Me</label>
          <textarea
          rows= "3"
          className = "input"
          type="text"
          name="about"
          placeholder="Enter about me..."
          defaultValue={user.about}  
        />
        <button className="submit" type="submit">Submit</button>
        </form>
        </div>
    </div>
  );
}