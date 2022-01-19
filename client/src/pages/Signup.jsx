import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import * as userApi from "../apis/user";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const signup = async () => {
    try {
      const res = await userApi.signup({
        username,
        password,
        email,
      });
      console.log(res);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Header empty updateInfo={false}></Header>
      <h2 className="text-center p-2">Thank you for signing up</h2>
      <form className="d-flex flex-column p-4 w-50 justify-content-center m-auto">
        <input
          className="form-control my-1"
          type="text"
          placeholder="Username"
          required="true"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className="form-control my-1"
          type="password"
          placeholder="Password"
          required="true"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          className="form-control my-1"
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button
          className="btn btn-primary my-1"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            signup();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
