import Header from "../components/Header";
import Cards from "../components/Cards";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as gameApi from "../apis/game";
import * as actions from "../store/actions";
import { useHistory } from "react-router-dom";
import connectWS from "../apis/connectWS";
import GameFlyer from "../components/GameFlyer";
import NoSleep from "nosleep.js";

function myNoSleep(e) {
  const v = document.getElementById("noSleep");
  // const v = document.createElement("video");
  v.src = `${process.env.PUBLIC_URL}/1.mp4`;
  v.autoplay = true;
  // v.controls = false;
  // v.muted = true;
  v.loop = true;

  v.width = "1";
  v.height = "1";
  // v.playsinline = true;
  // v.setAttribute("playsinline", "");
  // v.poster = `${process.env.PUBLIC_URL}/NoSleep.jpg`;

  // if (audio === null) {
  //   const a = new Audio(`${process.env.PUBLIC_URL}/audio-numbers/silence.wav`);
  //   setAudio(a);
  //   a.play()
  //     .then(() => {
  //       a.pause();
  //     })
  //     .catch((e) => {
  //       console.log("Couldn't play the audio");
  //     });
  v.play();
  document.removeEventListener("touchstart", myNoSleep, false);
  // }
}

document.addEventListener("touchstart", myNoSleep, false);

const Home = () => {
  const [gameid, setGameid] = useState(null);
  const history = useHistory();
  // const [loggedIn, setloggedIn] = useState(false);
  const [availableGames, setAvailableGames] = useState([]);
  const [betPerCard, setBetPerCard] = useState(1);
  const [noSleep, setNoSleep] = useState(new NoSleep());
  // const gameid = useSelector((state) => state.game.gameid);

  // WebSocket
  const dispatch = useDispatch();
  const ws = useSelector((state) => state.game.ws);
  const loggedIn = useSelector((state) => state.user.isLoggedIn);
  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    const massageHandler = (msg) => {
      // console.log("M received");
      // console.log(msg);
      const data = JSON.parse(msg.data);
      const type = data.type;
      const payload = data.payload;
      if (type === "availableGames") {
        setAvailableGames(payload.games);
      }
    };
    return connectWS(
      ws,
      dispatch,
      massageHandler,
      { type: "availableGames", payload: {} },
      { type: "availableGamesStop", payload: {} }
    );
  }, [loggedIn, dispatch, ws, setAvailableGames]);

  const createGame = async (betPerCard) => {
    try {
      const res = await gameApi.createGame(betPerCard);
      // const res = { data: { gameid: "AAAAA" } };
      // setGameid(res.data.gameid);
      console.log(res.data.gameId);
      dispatch(actions.createGame(res.data.gameId));
      history.push("/selectcard");
    } catch (e) {
      console.log(e);
    }
  };

  function enableNoSleep() {
    noSleep.enable();
    document.removeEventListener("touchstart", enableNoSleep, false);
  }

  useEffect(() => {
    document.addEventListener("touchstart", enableNoSleep, false);
  }, []);

  return (
    <div className="myhome">
      <Header />
      {loggedIn ? (
        <div className="gameControl">
          <div>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Bet per card = 1"
              onChange={(e) => {
                setBetPerCard(e.target.value);
              }}
            />
            <button
              className="btn btn-primary form-control me-2"
              type="submit"
              onClick={(e) => {
                createGame(betPerCard);
                e.preventDefault();
              }}
            >
              Create A Game
            </button>
          </div>
          <div className="join">
            <p>Or select a game to join.</p>
            {ws === null && (
              <div>
                <p>Please wait while connecting to the server</p>
              </div>
            )}
            {ws !== null && (
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
            )}
          </div>
        </div>
      ) : (
        <div className="text-center m-3 p-3 fs-1">Please login to play</div>
      )}
      <div data-vjs-player>
        <video
          playsInline
          id="noSleep"
          // src={`${process.env.PUBLIC_URL}/1.mp4`}
          // autoplay
          // muted
          // loop
          // poster={`${process.env.PUBLIC_URL}/NoSleep.jpg`}
        />
      </div>
    </div>
  );
};

export default Home;
