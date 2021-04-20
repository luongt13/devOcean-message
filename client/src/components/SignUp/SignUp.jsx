import { useState } from "react";
import { signUp, signIn } from "../../service/user";

export default function SignUp(props) {
  const defaultInput = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

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
    let res = await signIn(input);

    props.setCurrentUser(res.payload);
  };

  return (
    <div>
      <h3>Sign Up</h3>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          name="name"
          value={input.name}
          placeholder="Enter username..."
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={input.email}
          placeholder="Enter email..."
        />
        <label>password</label>
        <input
          type="password"
          name="password"
          value={input.password}
          placeholder="Enter password..."
        />
        <label>Password Confirmation</label>
        <input
          type="password"
          name="passwordConfirmation"
          value={input.passwordConfirmation}
          placeholder="reenter password..."
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
