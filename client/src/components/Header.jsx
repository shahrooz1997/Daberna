import axios from "axios";
import { useEffect, useState } from "react";
import loginApi from "../apis/user";

const Header = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logedIn, setlogedIn] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    (async function () {
      try {
        const res = await loginApi.get("/");
        setlogedIn(true);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const login = async () => {
    try {
      const res = await loginApi.post("/", {
        username,
        password,
      });
      setlogedIn(true);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="headerContainer bg-dark">
      <div>
        <h2 className="brand text-warning">Daberna</h2>
        <form>
          <input
            className="form-control me-2"
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="form-control me-2"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="btn btn-primary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          >
            Login
          </button>
          {/* <button className="btn btn-warning" type="submit">
            Sign Up
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default Header;
