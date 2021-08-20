import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as userApi from "../apis/user";

const Header = ({ homeLogIn, empty }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setloggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (homeLogIn) {
      homeLogIn(loggedIn);
    }
  }, [homeLogIn, loggedIn]);

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

  const logout = async () => {
    try {
      const res = await userApi.logout();
      setloggedIn(false);
      // setUsername(res.data.username);
      // setBalance(res.data.balance);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="headerContainer bg-dark">
      <div>
        <h2 className="brand text-warning">Daberna</h2>
        {!empty && isLoading && <div className="loading">Loading...</div>}
        {!empty && !isLoading && !loggedIn && (
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
            <Link to={"signup"}>
            <button className="btn btn-warning ms-2" type="submit">
              Sign Up
            </button>
            </Link>
          </form>
        )}
        {!empty && !isLoading && loggedIn && (
          <div className="userInfoContainer">
            <div className="userInfo">
              <div>Username: {username}</div>
              <div>Balance: ${balance}</div>
            </div>
            <div>
              <button
                className="form-control me-2 btn btn-danger"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
