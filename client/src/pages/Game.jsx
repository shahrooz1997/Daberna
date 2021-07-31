import { useEffect, useState } from "react";
import Header from "../components/Header";
import Card4 from "../components/Card4";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import "../styles/main.css";
import Info from "../components/Info";
import * as gameApi from "../apis/game";
import one from "../assets/audio-numbers/1.wav";
// import path from "path/posix";

const Game = () => {
  const [audio] = useState(new Audio(one));
  const [playing, setPlaying] = useState(false);
  const toggle = () => setPlaying(!playing);
  let id = useSelector((state) => state.card.selectedCard);
  const [luckyNum, setLuckyNum] = useState(-1);
  console.log("A" + id);
  const { id: pId } = useParams();
  if (id === null) {
    id = pId;
  }

  useEffect(() => {
    const audioFiles = [];
    for (let i = 0; i <= 90; i++) {
      const pathBase = "../assets/audio-numbers/";
      // audioFiles.push(path.join(pathBase, `${i}`));
      audioFiles.push(`../assets/audio-numbers/${i}`);
    }
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3600/number");
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
      <audio src={one} type="audio/mpeg"></audio>
      <div>
        <button controls onClick={startGame}>
          Start game
        </button>
        <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
      </div>
    </div>
  );
};

export default Game;
