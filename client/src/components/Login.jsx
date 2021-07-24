import { useState } from "react";

const Login = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [passowrd, setPassowrd] = useState("");

  return (
    <div className="login">
      <form className="login__form">
        <h1>Login here</h1>
        <input
          type="name"
          placeholder="Firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="name"
          placeholder="Lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="passowrd"
          placeholder="Passowrd"
          value={passowrd}
          onChange={(e) => setPassowrd(e.target.value)}
        />
        <button className="submit__btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
