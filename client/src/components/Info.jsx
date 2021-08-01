import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Info = (props) => {
  const [users, setUsers] = useState([]);
  const gameid = useSelector((state) => state.game.gameid);
  //   const [ws, setWs] = useState({});

  useEffect(() => {
    const ws = new WebSocket(
      `ws://${process.env.REACT_APP_SERVER_ADDRESS}/usernames`
    );
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
    };
    ws.onmessage = (e) => {
      console.log(e.data);
      setUsers(e.data.split(","));
    };
  }, []);

  return (
    <div className="gameInfo">
      <div>
        <h3>Game ID: </h3>
        <span>{gameid}</span>
      </div>

      <div>
        <h3>Users:</h3>
        {users.map((user) => {
          return <span key={user}>{user}, </span>;
        })}
      </div>
    </div>
  );
};

export default Info;
