import axios from "axios";
import { useEffect, useState } from "react";
import * as userApi from "../apis/user";

const Header = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setloggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async function () {
      try {
        const res = await userApi.isLoggedIn();
        setloggedIn(true);
        setUsername(res.data.username);
        setBalance(res.data.balance);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    })();
  }, []);

  const login = async () => {
    try {
      const res = await userApi.login({
        username,
        password,
      });
      setloggedIn(true);
      setUsername(res.data.username);
      setBalance(res.data.balance);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="headerContainer bg-dark">
      <div>
        <h2 className="brand text-warning">Daberna</h2>
        {isLoading && <div className="loading">Loading...</div>}
        {!isLoading && !loggedIn && (
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
        )}
        {!isLoading && loggedIn && (
          <div className="userInfo">
            <div>Username: {username}</div>
            <div>Balance: ${balance}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
