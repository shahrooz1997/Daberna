import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import xSign from "../assets/x.png";
import checkSign from "../assets/check.png";

const Info = ({ hasStarted, setAllUsersReady }) => {
  const [users, setUsers] = useState({});
  const gameid = useSelector((state) => state.game.gameid);
  const betPerCard = useSelector((state) => state.game.betPerCard);
  const dispatch = useDispatch();
  //   const [ws, setWs] = useState({});

  useEffect(() => {
    const ws = new WebSocket(
      `ws://${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/ws/usernames`
    );
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("ws/usernames connected");
    };
    ws.onclose = () => {
      if (!hasStarted) {
        setTimeout(() => {
          dispatch(actions.setWs(null));
        }, 500);
      }

      console.log(`WebSocket closed`);
    };
    ws.onmessage = (msg) => {
      // console.log("M received");
      // console.log(msg);
      const data = JSON.parse(msg.data);
      const type = data.type;
      const payload = data.payload;
      setUsers(payload.users);
      console.log("allUsersReady");
      console.log(payload.users);
      if (setAllUsersReady) {
        let allUsersReady = true;
        for (const user in payload.users) {
          if (!payload.users[user]) {
            allUsersReady = false;
            break;
          }
        }
        console.log(allUsersReady);
        setAllUsersReady(allUsersReady);
      }
    };
  }, [setAllUsersReady]);

  return (
    <div className="gameInfo">
      {/* <div>
        <h3>Game ID: </h3>
        <span>{gameid}</span>
      </div> */}

      <div>
        <h3>Pot: </h3>
        <span>${betPerCard * Object.keys(users).length}</span>
      </div>

      <div>
        <h3>Users({Object.keys(users).length}):</h3>
        {/* {users.map((user, index, array) => {
          return (
            <span key={user}>
              {user}
              {index !== array.length - 1 ? "," : ""}{" "}
            </span>
          );
        })} */}
        {Object.keys(users).map((user, index, array) => {
          return (
            <span key={user}>
              {user}
              <img
                src={users[user] ? checkSign : xSign}
                style={{ width: 15, height: 15 }}
              />
              {index !== array.length - 1 ? "," : ""}{" "}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Info;
