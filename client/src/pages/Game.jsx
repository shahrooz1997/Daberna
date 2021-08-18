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
  const [audios, setAudios] = useState([]);
  const [gainNode, setGainNode] = useState(null);
  console.log("A" + id);
  const { id: pId } = useParams();
  if (id === null) {
    id = pId;
  }

  useEffect(() => {
    async function f() {
      if (!silent) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        setAudioCtx(audioContext);
        if (audioContext.state === "suspended") {
          audioContext.resume();
        }
        const gainNode = audioContext.createGain();
        gainNode.connect(audioContext.destination);
        gainNode.gain.value = 0.0;
        setGainNode(gainNode);

        const ret = [];
        for (let i = 0; i <= 90; i++) {
          const audioPath = `${process.env.PUBLIC_URL}/audio-numbers/${i}.wav`;
          const audio = new Audio(audioPath);
          const source = audioContext.createMediaElementSource(audio);
          source.connect(gainNode);
          try {
            await audio.play();
          } catch (e) {
            console.log(e);
          }

          ret.push(audio);
        }
        document.querySelector("button").addEventListener("click", function () {
          audioContext.resume().then(() => {
            console.log("Playback resumed successfully");
          });
        });
        setAudios(ret);
      }
    }
    f();
  }, [silent, setAudioCtx, setAudios]);

  useEffect(() => {
    async function f() {
      if (
        !silent &&
        gainNode &&
        audios &&
        audios.length === 91 &&
        luckyNum >= 0
      ) {
        gainNode.gain.value = 0.8;

        try {
          await audios[luckyNum].play();
        } catch (e) {
          console.log(e);
        }
        // const url = `${process.env.PUBLIC_URL}/audio-numbers/${luckyNum}.wav`;
        // const audioObj = new Audio(url);
        // const source = audioCtx.createMediaElementSource(audioObj);
        // var gainNode = audioCtx.createGain();
        // gainNode.gain.value = 0.2;
        // source.connect(gainNode);
        // gainNode.connect(audioCtx.destination);
        // // source.connect(audioCtx.destination);
        // console.log("SSSS ", audioCtx.state);
        // audioObj.play();
        // // for (let i = 0; i < 100000000; i++) {}
        // // source.disconnect(audioCtx.destination);
      }
    }
    f();
  }, [audios, gainNode, luckyNum, silent]);

  // useEffect(() => {
  //   audio.addEventListener("ended", () => setPlaying(false));
  //   return () => {
  //     audio.removeEventListener("ended", () => setPlaying(false));
  //   };
  // }, []);

  // useEffect(() => {
  //   const playSound = async () => {
  //     if (luckyNum === -1) {
  //       return;
  //     }
  //     try {
  //       // const audioPath = `${process.env.PUBLIC_URL}/audio-numbers/${luckyNum}.wav`;
  //       // audio = new Audio(audioPath);
  //       const audio = refAdudio.current[luckyNum];
  //       await audio.play();
  //       // playing ? audio.play() : audio.pause();
  //       audio.addEventListener("ended", () => audio.pause());
  //       return () => {
  //         audio.removeEventListener("ended", () => audio.pause());
  //       };
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   playSound();
  // }, [luckyNum]);

  // useEffect(() => {
  //   // if (audio) {
  //   //   audio.muted = silent;
  //   // }
  //   for (let i = 0; i <= refAdudio.current.length; i++) {
  //     refAdudio.current[i].muted = silent;
  //   }
  // }, [silent]);

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
        console.log(e);
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
  }, [id]);

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
          console.log("AAA");
          oldLuckyNums = luckyNums;
        }
        if (oldLuckyNums.length < 3) {
          console.log("BBB");
          newLuckyNums = [...oldLuckyNums];
        } else {
          for (let i = 1; i < oldLuckyNums.length; i++) {
            console.log("CCC");
            newLuckyNums.push(oldLuckyNums[i]);
          }
        }

        newLuckyNums.push(luckyNum);
        setLuckyNums(newLuckyNums);
        console.log(newLuckyNums);
      }
    };
    makeLuckyNumsArray();
  }, [luckyNum]);

  console.log("B" + id);

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
              <span>
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
