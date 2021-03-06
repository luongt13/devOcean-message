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
    if(res === 400) {
      alert("User not found")
    } else if (res === 401) {
      alert("Password Invalid")
    } else {
      props.setCurrentUser(res.payload)
      history.push("/users")
    }
  }

  return (
    <div>
      <h3 className="form-title">Sign In</h3>
      <div className="form-container">
      <form className="sign-in-form"onChange={handleChange} onSubmit={handleSubmit}>
        <label className="label">Email</label>
        <input
          className = "input"
          type="email"
          name="email"
          defaultValue={input.email}
          placeholder="Enter email..."
          required 
        />
        <label className="label">Password</label>
        <input
          className = "input"
          type="password"
          name="password"
          defaultValue={input.password}
          placeholder="Enter password..."
          required 
        />
        <button className="submit" type="submit">Sign In</button>
      </form>
      </div>
    </div>
  );
}
