import { useState } from "react";
import { updateUser } from "../../service/user"
import { useHistory } from "react-router-dom"

export default function UpdateUser(props) {
  const defaultInput = {
    name: "",
    email: "",
    imgURL: "",
    location: "",
    job: "",
    languages: "",
    professionalLink: "",
    about: "",
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
    history.push(`/users`)
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
        />
        <label className="label">Email</label>
          <input
          className = "input"
          type="email"
          name="email"
          placeholder="Enter email..."
        />
        <label className="label">Profile Image</label>
          <input
          className = "input"
          type="text"
          name="imgURL"
          placeholder="Enter URL for image..."
        />
        <label className="label">Location</label>
          <input
          className = "input"
          type="text"
          name="location"
          placeholder="Enter location..."
        />
        <label className="label">Job Title</label>
          <input
          className = "input"
          type="text"
          name="job"
          placeholder="Enter job title..."
        />
        <label className="label">Languages</label>
          <input
          className = "input"
          type="text"
          name="languages"
          placeholder="Enter languages..."
        />
        <label className="label">Professional Link</label>
          <input
          className = "input"
          type="text"
          name="professionalLink"
          placeholder="Enter professional link URL..."
        /> 
        <label className="label">About Me</label>
          <input
          className = "input"
          type="text"
          name="about"
          placeholder="Enter about me..."
        />
        <button className="submit" type="submit">Submit</button>
        </form>
        </div>
    </div>
  );
}