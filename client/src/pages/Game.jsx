import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Card4 from "../components/Card4";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import "../styles/main.css";
import Info from "../components/Info";
import * as gameApi from "../apis/game";
import connectWS from "../apis/connectWS";
import { useHistory } from "react-router-dom";

const Game = () => {
  // let id = useSelector((state) => state.card.selectedCard);
  const [id, setId] = useState(useSelector((state) => state.card.selectedCard));
  const [gameOwner, setGameOwner] = useState(
    useSelector((state) => state.game.gameOwner)
  );
  // const gameOwner = useSelector((state) => state.game.gameOwner);
  const [luckynum1, setLuckynum1] = useState(null);
  const [luckynum2, setLuckynum2] = useState(null);
  const [luckynum3, setLuckynum3] = useState(null);

  const [luckyNum, setLuckyNum] = useState(-1);
  const [luckyNums, setLuckyNums] = useState(["Start the game"]);
  const [text, setText] = useState("");
  const [playing, setPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [silent, setSilent] = useState(true);
  const [audio, setAudio] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [allUsersReady, setAllUsersReady] = useState(false);
  const [updateInfo, setUpdateInfo] = useState(false);
  // const { id: pId } = useParams();
  // if (id === null) {
  //   id = pId;
  // }

  useEffect(() => {
    if (!silent && audio === null) {
      const a = new Audio(
        `${process.env.PUBLIC_URL}/audio-numbers/silence.wav`
      );
      setAudio(a);
      a.play()
        .then(() => {
          a.pause();
        })
        .catch((e) => {
          console.log("Couln't play the audio");
        });
    }
  }, [audio, silent, setAudio]);

  useEffect(() => {
    async function f() {
      if (silent && audio) {
        audio.pause();
      }
      console.log(silent, parseInt(luckyNum, 10), audio);
      if (!silent && parseInt(luckyNum, 10) >= 0 && audio) {
        const audioPath = `${process.env.PUBLIC_URL}/audio-numbers/${luckyNum}.wav`;
        audio.src = audioPath;
        const playPromise = audio.play();
        // if (playPromise) {
        //   playPromise
        //     .then(() => {
        //       console.log("played");
        //     })
        //     .catch((e) => {
        //       console.log("Couldn't play ", e);
        //     });
        // }
      }
    }
    f();
  }, [audio, luckyNum, silent]);

  // Active audio on smart phones
  function activeAudio(e) {
    if (audio === null) {
      document.removeEventListener("touchstart", activeAudio, false);
      const a = new Audio(
        `${process.env.PUBLIC_URL}/audio-numbers/silence.wav`
      );
      setAudio(a);
      a.play()
        .then(() => {
          a.pause();
        })
        .catch((e) => {
          console.log("Couldn't play the audio");
        });
    }
  }

  useEffect(() => {
    document.addEventListener("touchstart", activeAudio, false);
  }, []);

  const toggleSilent = () => {
    setSilent(!silent);
  };

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
      if (type === "number") {
        setLuckyNum(payload.number);
        setLuckynum1(payload.number);
        setHasStarted(true);
        setPlaying(true);
      } else if (type === "win") {
        setText("Game Paused, One user claimed winning. Evaluating...");
        setLuckynum1("Game Paused, One user claimed winning. Evaluating...");
      } else if (data.type === "nowin") {
        setText("No winner detected. Game will continue in 2 seconds.");
        setLuckynum1("No winner detected. Game will continue in 2 seconds.");
        setTimeout(() => {
          setText("");
        }, 2000);
      } else if (type === "winners") {
        setText("winners: " + payload.winners.join(", ").toString());
        setLuckynum1("winner(s): " + payload.winners.join(", ").toString());
        setUpdateInfo(true);
        setGameFinished(true);
      } else if (type === "startgame") {
        setHasStarted(true);
        setPlaying(true);
        if (!hasStarted) {
          setLuckynum1("Game starts in 3 seconds");
        } else {
          setLuckynum1("Game continues in 3 seconds");
        }
      } else if (type === "pausegame") {
        setPlaying(false);
        setLuckynum1("Game paused, " + luckynum1);
      }
    };
    return connectWS(
      ws,
      dispatch,
      massageHandler,
      { type: "number", payload: {} },
      { type: "numberStop", payload: {} }
    );
  }, [
    loggedIn,
    dispatch,
    ws,
    setLuckyNum,
    setText,
    setPlaying,
    setHasStarted,
    setUpdateInfo,
    setLuckynum1,
    luckynum1,
    hasStarted,
  ]);

  useEffect(() => {
    if (luckynum1 === null || !hasStarted) {
      if (gameOwner) {
        if (allUsersReady) {
          setLuckynum1("Press Start game");
        } else {
          setLuckynum1("Wait for other users to get ready");
        }
      } else {
        if (isReady) {
          setLuckynum1("Wait for the host to start the game");
        } else {
          setLuckynum1("Press Ready");
        }
      }
    } else if (luckynum1 === -1) {
      setLuckynum1("All numbers are out. Press I Win");
    } else {
    }
  }, [luckynum1, isReady, gameOwner, allUsersReady, hasStarted]);

  useEffect(() => {
    const makeLuckyNumsArray = () => {
      if (luckyNum === -1) {
        if (playing) {
          setLuckyNums(["Done"]);
        } else {
          setLuckyNums(["Start the game"]);
        }
      } else {
        let newLuckyNums = [];
        let oldLuckyNums = [];
        if (
          !(
            (luckyNums.length !== 0 && luckyNums[0] === "Start the game") ||
            luckyNums[0] === "Done"
          )
        ) {
          oldLuckyNums = luckyNums;
        }
        if (oldLuckyNums.length < 3) {
          newLuckyNums = [...oldLuckyNums];
        } else {
          for (let i = 1; i < oldLuckyNums.length; i++) {
            newLuckyNums.push(oldLuckyNums[i]);
          }
        }

        newLuckyNums.push(luckyNum);
        setLuckyNums(newLuckyNums);
      }
    };
    makeLuckyNumsArray();
  }, [luckyNum]);

  useEffect(() => {
    dispatch(actions.selectCard(id));
  }, [dispatch, id]);
  const cards = useSelector((state) => state.card.cards);
  const [nums, setNums] = useState(null);
  useEffect(() => {
    (async function () {
      const selectedCard = cards.find((card) => card.id === id);
      if (!selectedCard) {
        try {
          let res = await gameApi.selectCard({ cardId: -1 });
          console.log("REST");
          console.log(res);
          res = res.data;
          dispatch(actions.selectCard(res.cardId));
          setId(res.cardId);
          setGameOwner(res.gameOwner);
          setNums(res.nums);
          if (res.gameOwner) {
            dispatch(actions.createGame(res.gameid, res.bet));
          } else {
            dispatch(actions.joinGame(res.gameid, res.bet));
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        setNums(selectedCard.numbers);
      }
      // const selectedCard = cards.find((card) => card.id === id);
      // if (selectedCard !== undefined) {
      //   setNums(selectedCard.numbers);
      // } else {
      // }
    })();
  }, [id, cards, setNums, setId, setGameOwner]);

  const startGame = async () => {
    try {
      const res = await gameApi.startGame();
      console.log("game started");
    } catch (e) {
      console.log(e);
    }
  };

  const pauseGame = async () => {
    try {
      const res = await gameApi.pauseGame();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const wait = async () => {
    try {
      const res = await gameApi.wait();
    } catch (e) {
      console.log(e);
    }
  };

  const ready = async () => {
    try {
      setIsReady(true);
      const res = await gameApi.ready();
    } catch (e) {
      console.log(e);
    }
  };

  const winGame = async () => {
    try {
      console.log("clicked");
      const res = await gameApi.winGame();
      // if (res.data.status) {
      //   console.log("You won");
      //   alert("You won");
      // } else {
      //   console.log("Cheater!! (:");
      //   alert("Cheater!! (:");
      //   console.log(res.data);
      // }
    } catch (e) {
      console.log(e);
    }
  };

  const history = useHistory();
  const newGame = (e) => {
    history.push("/");
    e.preventDefault();
  };

  return (
    <div style={{ backgroundColor: "#ddd" }}>
      <Header updateInfo={updateInfo} />
      <Info hasStarted={hasStarted} setAllUsersReady={setAllUsersReady} />
      <div className="text-center mb-3">
        {/* <h4>{gameFinished ? "Winner(s)" : "Lucky number"}</h4> */}
        <h2 className="luckynum">
          {/* {luckyNums.map((num, index, array) => {
            return (
              <span key={num}>
                {num}
                {index !== array.length - 1 ? "," : ""}{" "}
              </span>
            );
          })} */}
          {luckynum1}
        </h2>
      </div>
      {/* {text !== "" ? <div> {text} </div> : <div></div>} */}
      {/* <h2 className="text-center">Your cards</h2> */}
      <div className="cards">
        <Card4 id={id} nums={nums} />
      </div>
      {/* <audio controls src={one} type="audio/mpeg"></audio> */}
      {/* <button onClick={toggle}>{playing ? "Pause" : "Play"}</button> */}
      {!gameFinished ? (
        <div className="gamePageButtons">
          {gameOwner ? (
            playing ? (
              <button className="btn btn-primary" onClick={pauseGame}>
                Pause game
              </button>
            ) : (
              <button className="btn btn-primary" onClick={startGame}>
                Start game
              </button>
            )
          ) : hasStarted ? (
            <button className="btn btn-primary" onClick={wait}>
              Wait 5 sec
            </button>
          ) : (
            <button
              disabled={isReady}
              className="btn btn-primary"
              onClick={ready}
            >
              Ready
            </button>
          )}

          <button className="btn btn-success" onClick={toggleSilent}>
            {silent ? <span>Unmute</span> : <span>Mute</span>}
          </button>
          <button className="btn btn-success" onClick={winGame}>
            I Win
          </button>
        </div>
      ) : (
        // <div className="w-100 p-2"></div>
        <div className="gamePageButtons">
          <button
            disabled={!gameOwner}
            id="rematch-btn"
            className="btn btn-primary"
            onClick={pauseGame}
          >
            {gameOwner ? "Rematch" : "Wait for host to rematch"}
          </button>

          <button className="btn btn-success" onClick={newGame}>
            New Game
          </button>
        </div>
      )}
      <div className="w-100 p-3"></div>
    </div>
  );
};

export default Game;
