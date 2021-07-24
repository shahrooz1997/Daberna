import { useState } from "react";

const Logout = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [passowrd, setPassowrd] = useState("");

  return (
    <div className="login">
      <h1>Welcome</h1>
      <button className="logout__bottun">Logout</button>
    </div>
  );
};

export default Logout;
