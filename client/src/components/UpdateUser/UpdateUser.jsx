import { useState } from "react";
import { updateUser } from "../../service/user"
import { useHistory } from "react-router-dom"

export default function UpdateUser() {
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
    let res = await updateUser(input);
    // setUser(res)
    history.push(`/users`)
  };

  return (
    <div>
      <h3>Edit Profile</h3>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          name="name"
          value={input.name}
          placeholder="Enter name..."
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={input.email}
          placeholder="Enter email..."
        />
        <label>Profile Image</label>
        <input
          type="text"
          name="imgURL"
          value={input.imgURL}
          placeholder="Enter URL for image..."
        />
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={input.location}
          placeholder="Enter location..."
        />
        <label>Job Title</label>
        <input
          type="text"
          name="job"
          value={input.job}
          placeholder="Enter job title..."
        />
        <label>Languages</label>
        <input
          type="text"
          name="languages"
          value={input.languages}
          placeholder="Enter languages..."
        />
        <label>Professional Link</label>
        <input
          type="text"
          name="professionalLink"
          value={input.professionalLink}
          placeholder="Enter professional link URL..."
        />
        <label>About Me</label>
        <input
          type="textarea"
          name="about"
          value={input.about}
          placeholder="Enter about me profile..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}