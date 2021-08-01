import { useEffect, useState } from "react";
import Header from "../components/Header";
import Card4 from "../components/Card4";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import "../styles/main.css";
import Info from "../components/Info";
import * as gameApi from "../apis/game";
// import path from "path/posix";

const Game = () => {
  // const [playing, setPlaying] = useState(false);
  // const toggle = () => setPlaying(!playing);
  let id = useSelector((state) => state.card.selectedCard);
  const gameOwner = useSelector((state) => state.game.gameOwner);
  const [luckyNum, setLuckyNum] = useState(-1);
  console.log("A" + id);
  const { id: pId } = useParams();
  if (id === null) {
    id = pId;
  }

  // useEffect(() => {
  //   audio.addEventListener("ended", () => setPlaying(false));
  //   return () => {
  //     audio.removeEventListener("ended", () => setPlaying(false));
  //   };
  // }, []);

  useEffect(() => {
    if (luckyNum == -1) {
      return;
    }
    const audioPath = `${process.env.PUBLIC_URL}/audio-numbers/${luckyNum}.wav`;
    const audio = new Audio(audioPath);
    audio.play();
    // playing ? audio.play() : audio.pause();
    audio.addEventListener("ended", () => audio.pause());
    return () => {
      audio.removeEventListener("ended", () => audio.pause());
    };
  }, [luckyNum]);

  useEffect(() => {
    const ws = new WebSocket(
      `ws://${process.env.REACT_APP_SERVER_ADDRESS}/number`
    );
    ws.onopen = () => {
      console.log("Connected to numbers WS");
    };
    ws.onmessage = (e) => {
      if (e.data.type !== "") {
        setLuckyNum(e.data);
      }
    };
  }, []);

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
      const res = await gameApi.startGame();
    } catch (e) {
      console.log(e);
    }
  };

  const winGame = async () => {
    try {
      console.log("clicked");
      const res = await gameApi.winGame();
      if (res.data.win) {
      } else {
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
        <h2 className="luckynum">{luckyNum}</h2>
      </div>
      {/* <h2 className="text-center">Your cards</h2> */}
      <div className="cards">
        <Card4 id={id} nums={nums} />
      </div>
      {/* <audio controls src={one} type="audio/mpeg"></audio> */}
      {/* <button onClick={toggle}>{playing ? "Pause" : "Play"}</button> */}
      <div className="gamePageButtons">
        {gameOwner ? (
          <button className="btn btn-primary" onClick={startGame}>
            Start game
          </button>
        ) : (
          <button disabled className="btn btn-primary" onClick={startGame}>
            Start game
          </button>
        )}
        <button className="btn btn-success" onClick={winGame}>
          I Win
        </button>
      </div>
    </div>
  );
};

export default Game;
