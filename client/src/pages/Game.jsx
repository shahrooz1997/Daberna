import { useEffect, useState } from "react";
import Header from "../components/Header";
import Card4 from "../components/Card4";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import "../styles/main.css";

const Game = () => {
  let id = useSelector((state) => state.card.selectedCard);
  console.log("A" + id);
  const { id: pId } = useParams();
  if (id === null) {
    id = pId;
  }

  console.log("B" + id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.selectCard(id));
  }, [dispatch, id]);

  const cards = useSelector((state) => state.card.cards);
  const selectedCard = cards.find((card) => card.id === id);
  const nums = selectedCard.numbers;

  return (
    <div style={{ backgroundColor: "#ddd" }}>
      <Header />
      <div className="text-center mb-3">
        <h2>Lucky number</h2>
        <h2>46</h2>
      </div>
      <h2 className="text-center">Your cards</h2>
      <div className="cards">
        <Card4 id={id} nums={nums} />
      </div>
    </div>
  );
};

export default Game;
