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
        <label>Username</label>
        <input
          name="username"
          value={input.username}
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
