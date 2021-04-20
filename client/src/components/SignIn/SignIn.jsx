import { useState } from "react";
import { signIn } from "../../service/user";

export default function SignIn(props) {
  const defaultInput = {
    email: "",
    password: "",
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
    let res = await signIn(input);
    props.setCurrentUser(res.payload);
  };

  return (

    <div>
      <h3>Sign In</h3>
      <form onChange={handleChange} onSubmit={handleSubmit}>
      <label>Name</label>
        <input
          type="name"
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
        <label>password</label>
        <input
          type="password"
          name="password"
          value={input.password}
          placeholder="Enter password..."
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
