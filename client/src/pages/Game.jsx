import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Card4 from "../components/Card4";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import "../styles/main.css";
import Info from "../components/Info";
import * as gameApi from "../apis/game";
// import path from "path/posix";

function getAudios() {
  const ret = [];
  // for (let i = 0; i <= 90; i++) {
  //   const audioPath = `${process.env.PUBLIC_URL}/audio-numbers/${i}.wav`;
  //   const audio = new Audio(audioPath);
  //   audio.muted = false;
  //   ret.push(audio);
  // }
  return ret;
}

const Game = () => {
  // const [playing, setPlaying] = useState(false);
  // const toggle = () => setPlaying(!playing);
  // const refAdudio = useRef(getAudios());
  // let audio;
  let id = useSelector((state) => state.card.selectedCard);
  const gameOwner = useSelector((state) => state.game.gameOwner);
  const [luckyNum, setLuckyNum] = useState(-1);
  const [luckyNums, setLuckyNums] = useState(["Start the game"]);
  const [gameStarted, setgameStarted] = useState(false);
  const [silent, setSilent] = useState(true);
  const [audioCtx, setAudioCtx] = useState(null);
  const [audio, setAudio] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const { id: pId } = useParams();
  if (id === null) {
    id = pId;
  }

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
      console.log("TTTT");
      console.log(audio);
      if (silent && audio) {
        audio.pause();
      }
      console.log(silent, parseInt(luckyNum, 10), audio);
      if (!silent && parseInt(luckyNum, 10) >= 0 && audio) {
        const audioPath = `${process.env.PUBLIC_URL}/audio-numbers/${luckyNum}.wav`;
        audio.src = audioPath;
        const playPromise = audio.play();
        if (playPromise) {
          playPromise
            .then(() => {
              console.log("played");
            })
            .catch((e) => {
              console.log("Couldn't play ", e);
            });
        }
      }
    }
    f();
  }, [audio, luckyNum, silent]);

  function activeAudio(e) {
    if (audio === null) {
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
      document.removeEventListener("touchstart", activeAudio, false);
    }
  }

  document.addEventListener("touchstart", activeAudio, false);

  const toggleSilent = () => {
    setSilent(!silent);
  };

  useEffect(() => {
    const cardSelected = async () => {
      try {
        const res = await gameApi.cardSelected({
          cardId: id,
        });
      } catch (e) {
        console.log("gameApi.cardSelected err: ", e);
      }
    };
    cardSelected();
    const ws = new WebSocket(
      `ws://${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/ws/number`
    );
    ws.onopen = () => {
      console.log("Connected to numbers WS");
    };
    ws.onmessage = (e) => {
      if (e.data.type !== "") {
        setLuckyNum(e.data);
      }
    };
  }, [id, setLuckyNum]);

  useEffect(() => {
    const makeLuckyNumsArray = () => {
      if (luckyNum === -1) {
        if (gameStarted) {
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.selectCard(id));
  }, [dispatch, id]);

  const cards = useSelector((state) => state.card.cards);
  const selectedCard = cards.find((card) => card.id === id);
  const nums = selectedCard.numbers;

  const startGame = async () => {
    try {
      console.log("clicked");
      setgameStarted(true);
      const res = await gameApi.startGame();
    } catch (e) {
      console.log(e);
    }
  };
  const pauseGame = async () => {
    try {
      console.log("clicked");
      setgameStarted(false);
      const res = await gameApi.pauseGame();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const winGame = async () => {
    try {
      console.log("clicked");
      const res = await gameApi.winGame();
      if (res.data.win) {
        console.log("You won");
        alert("You won");
      } else {
        console.log("Cheater!! (:");
        alert("Cheater!! (:");
        console.log(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{ backgroundColor: "#ddd" }}>
      <Header />
      <Info />
      <div className="text-center mb-3">
        <h4>Lucky number</h4>
        <h2 className="luckynum">
          {luckyNums.map((num, index, array) => {
            return (
              <span key={num}>
                {num}
                {index !== array.length - 1 ? "," : ""}{" "}
              </span>
            );
          })}
        </h2>
      </div>
      {/* <h2 className="text-center">Your cards</h2> */}
      <div className="cards">
        <Card4 id={id} nums={nums} />
      </div>
      {/* <audio controls src={one} type="audio/mpeg"></audio> */}
      {/* <button onClick={toggle}>{playing ? "Pause" : "Play"}</button> */}
      <div className="gamePageButtons">
        {gameStarted ? (
          <button
            disabled={!gameOwner || !gameStarted}
            className="btn btn-primary"
            onClick={pauseGame}
          >
            Pause game
          </button>
        ) : (
          <button
            disabled={!gameOwner || gameStarted}
            className="btn btn-primary"
            onClick={startGame}
          >
            Start game
          </button>
        )}
        <button className="btn btn-success" onClick={toggleSilent}>
          {silent ? <span>Unmute</span> : <span>Mute</span>}
        </button>
        <button className="btn btn-success" onClick={winGame}>
          I Win
        </button>
      </div>
    </div>
  );
};

export default Game;
