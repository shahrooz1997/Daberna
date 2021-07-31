import Header from "../components/Header";
import Cards from "../components/Cards";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as gameApi from "../apis/game";
import * as actions from "../store/actions";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [gameid, setGameid] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  // const gameid = useSelector((state) => state.game.gameid);

  const createGame = async () => {
    try {
      console.log("clicked");
      const res = await gameApi.createGame();
      // const res = { data: { gameid: "AAAAA" } };
      // setGameid(res.data.gameid);
      console.log(res.data.gameid);
      dispatch(actions.createGame(res.data.gameid));
    } catch (e) {
      console.log(e);
    }
  };

  const joinGame = async () => {
    try {
      console.log("clicked");
      const res = await gameApi.joinGame({
        gameid,
      });
      console.log(gameid);
      dispatch(actions.joinGame(gameid));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="myhome">
      <Header />
      <div>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={(e) => {
            createGame();
            history.push("/selectcard");
            e.preventDefault();
          }}
        >
          Create A Game
        </button>
        <input
          className="form-control me-2"
          type="text"
          placeholder="Game id"
          onChange={(e) => {
            setGameid(e.target.value);
            // setUsername(e.target.value);
          }}
        />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={(e) => {
            joinGame();
            history.push("/selectcard");
            e.preventDefault();
          }}
        >
          Join A Game
        </button>
      </div>
    </div>
  );
};

export default Home;
