import { useState } from "react"
import { signIn } from "../../service/user"
import {useHistory} from "react-router-dom"
import "./SignIn.css"

export default function SignIn(props) {
  const defaultInput = {
    email: "",
    password: "",
  };

  const history = useHistory();
  const [input, setInput] = useState(defaultInput);

  const handleChange = (event) => {
    let { name, value } = event.target
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let res = await signIn(input)
    props.setCurrentUser(res.payload)
    history.push("/users")
  }

  return (
    <div>
      <h3 className="FormTitle">Sign In</h3>
      <div className="FormContainer">
      <form className="SignInForm"onChange={handleChange} onSubmit={handleSubmit}>
      <label className="label">Name</label>
        <label className="label">Email</label>
        <input
          className = "input"
          type="email"
          name="email"
          value={input.email}
          placeholder="Enter email..."
        />
        <label className="label">password</label>
        <input
          className = "input"
          type="password"
          name="password"
          value={input.password}
          placeholder="Enter password..."
        />
        <button className="submit" type="submit">Sign In</button>
      </form>
      </div>
    </div>
  );
}
