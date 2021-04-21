import { useState } from "react";
import { signUp, signIn } from "../../service/user";
import {useHistory} from "react-router-dom"
import "./SignUp.css"

export default function SignUp(props) {
  const defaultInput = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    imgURL: "",
    location: "",
    job: "",
    languages: "",
    professionalLink: "",
    about: "",
  };
  let history = useHistory()
  const [input, setInput] = useState(defaultInput);

  const handleChange = (event) => {
    let { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(input);
    let res = await signIn(input)
    props.setCurrentUser(res.payload);
    history.push("/sign-in")
  };

  return (
    <div>
      <h3 className="form-title">Sign Up</h3>
      <div className="form-container">
      <form className="sign-up-form" onChange={handleChange} onSubmit={handleSubmit}>
        <label className="label">Name</label>
        <input
          className = "input"
          name="name"
          value={input.name}
          placeholder="Enter username..."
        />
        <label className="label">Email</label>
        <input
          className = "input"
          type="email"
          name="email"
          value={input.email}
          placeholder="Enter email..."
        />
        <label className="label">Password</label>
        <input
          className = "input"
          type="password"
          name="password"
          value={input.password}
          placeholder="Enter password..."
        />
        <label className="label">Password Confirmation</label>
        <input
          className = "input"
          type="password"
          name="passwordConfirmation"
          value={input.passwordConfirmation}
          placeholder="reenter password..."
        />
        <label className="label">Profile Image</label>
        <input
          className = "input"
          type="text"
          name="imgURL"
          value={input.imgURL}
          placeholder="Enter URL for image..."
        />
        <label className="label">Location</label>
        <input
          className = "input"
          type="text"
          name="location"
          value={input.location}
          placeholder="Enter location..."
        />
        <label className="label">Job Title</label>
        <input
          className = "input"
          type="text"
          name="job"
          value={input.job}
          placeholder="Enter job title..."
        />
        <label className="label">Languages</label>
        <input
          className = "input"
          type="text"
          name="languages"
          value={input.languages}
          placeholder="Enter languages..."
        />
        <label className="label">Professional Link</label>
        <input
          className = "input"
          type="text"
          name="professionalLink"
          value={input.professionalLink}
          placeholder="Enter professional link URL..."
        />
        <label className="label">About Me</label>
        <textarea
          rows="3"
          className = "input"
          type="text"
          name="about"
          value={input.about}
          placeholder="Enter about me profile..."
        />
        <button className="submit" type="submit">Sign Up</button>
      </form>
      </div>
    </div>
  );
}
