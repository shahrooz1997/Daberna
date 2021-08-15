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
  const [loggedIn, setloggedIn] = useState(false);
  // const gameid = useSelector((state) => state.game.gameid);

  const createGame = async () => {
    try {
      console.log("clicked");
      const res = await gameApi.createGame();
      // const res = { data: { gameid: "AAAAA" } };
      // setGameid(res.data.gameid);
      console.log(res.data.gameId);
      dispatch(actions.createGame(res.data.gameId));
      history.push("/selectcard");
    } catch (e) {
      console.log(e);
    }
  };

  const joinGame = async () => {
    try {
      console.log("clicked");
      const res = await gameApi.joinGame(gameid);
      console.log("joined " + gameid);
      dispatch(actions.joinGame(gameid));
      history.push("/selectcard");
    } catch (e) {
      console.log("e");
      console.log(e);
      console.log("e2");
    }
  };

  return (
    <div className="myhome">
      <Header homeLogIn={setloggedIn} />
      {loggedIn ? (
        <div className="gameControl">
          <div>
            <button
              className="btn btn-primary form-control me-2"
              type="submit"
              onClick={(e) => {
                createGame();
                e.preventDefault();
              }}
            >
              Create A Game
            </button>
          </div>
          <div className="join">
            <p>A friend has sent you a game id? Join here.</p>

            <div>
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
                className="btn btn-primary form-control me-2"
                type="submit"
                onClick={(e) => {
                  joinGame();
                  e.preventDefault();
                }}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center m-3 p-3 fs-1">Please login to play</div>
      )}
    </div>
  );
};

export default Home;
