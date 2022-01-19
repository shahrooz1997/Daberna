import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as userApi from "../apis/user";
import * as actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ empty, updateInfo }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setloggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedIn) {
      dispatch(actions.userLogin());
    } else {
      dispatch(actions.userLogout());
    }
  }, [loggedIn]);

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
  }, [updateInfo]);

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

  const signup = () => {
    history.push("/signup");
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
            {/* <Link to={"signup"}> */}
            <button
              className="btn btn-warning ms-2"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                signup();
              }}
            >
              Sign Up
            </button>
            {/* </Link> */}
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
                className="btn btn-danger m-2 me-2"
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
