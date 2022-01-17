import Header from "../components/Header";
import Cards from "../components/Cards";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as gameApi from "../apis/game";
import * as actions from "../store/actions";
import { useHistory } from "react-router-dom";
import connectWS, { isReady as isWsReady } from "../apis/connectWS";
import GameFlyer from "../components/GameFlyer";

const Home = () => {
  const [gameid, setGameid] = useState(null);
  const history = useHistory();
  const [loggedIn, setloggedIn] = useState(false);
  const [availableGames, setAvailableGames] = useState([]);
  // const gameid = useSelector((state) => state.game.gameid);

  // WebSocket
  const dispatch = useDispatch();
  const ws = useSelector((state) => state.game.ws);
  useEffect(() => {
    console.log("AAAAAbbbb");
    (async function () {
      console.log(ws);
      if (ws === null) {
        // Connect the websocket
        console.log("tyrrr");
        dispatch(actions.setWs(connectWS(dispatch)));
      } else {
        // Setup the websocket message handler
        ws.onmessage = (e) => {
          console.log("M received");
          console.log(e);
          const data = JSON.parse(e.data);
          const type = data.type;
          const payload = data.payload;
          if (type === "availableGames") {
            setAvailableGames(payload.games);
          }
        };
        // Wait for the WS to be open
        if (ws.readyState !== WebSocket.OPEN) {
          try {
            await isWsReady(ws);
            // Send a message
            console.log("M sent");
            ws.send(JSON.stringify({ type: "availableGames", payload: {} }));
          } catch (e) {
            console.error(e);
          }
        } else {
          // Send a message
          console.log("M sent");
          ws.send(JSON.stringify({ type: "availableGames", payload: {} }));
        }
      }
    })();
    return async () => {
      if (ws !== null) {
        if (ws.readyState !== WebSocket.OPEN) {
          try {
            await isWsReady(ws);
            // Send a message
            console.log("M not sent");
            ws.send(
              JSON.stringify({ type: "availableGamesStop", payload: {} })
            );
          } catch (e) {
            console.error(e);
          }
        } else {
          // Send a message
          console.log("M not sent");
          ws.send(JSON.stringify({ type: "availableGamesStop", payload: {} }));
        }
      }
    };
  }, [dispatch, ws, setAvailableGames]);

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
            <p>Or select a game to join.</p>

            <div className="d-flex flex-row flex-wrap justify-content-between">
              {availableGames &&
                availableGames.map((game) => {
                  return (
                    <GameFlyer
                      key={game.gameid}
                      gameid={game.gameid}
                      creatorName={game.owner}
                      bet={game.bet}
                    />
                  );
                })}
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
