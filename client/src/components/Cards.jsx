import { useState, useEffect } from "react";
import Card4 from "./Card4";
import CardsFinder from "../apis/CardsFinder";
import "../styles/card.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { Link } from "react-router-dom";
import { getAllCards } from "../apis/game";

const Cards = () => {
  const [allCards, setAllCards] = useState([]);
  const [availableCards, setAvailableCards] = useState([]);
  const [availableCardsIds, setAvailableCardsIds] = useState([]);
  const [cards, setCards] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await getAllCards();
        console.log(res.data.cards);
        // setCards(res.data.cards);
        dispatch(actions.getAllCards(res.data.cards));
        setAllCards(res.data.cards);
        const ws = new WebSocket(
          `ws://${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/ws/available_cards`
        );
        ws.onopen = () => {
          // on connecting, do nothing but log it to the console
          console.log("available_cards connected");
        };
        ws.onmessage = (e) => {
          console.log(e.data);
          setAvailableCardsIds(e.data.split(","));
        };
      } catch (err) {
        console.log(err);
      }
    };
    fetchCards();
  }, [dispatch]);

  useEffect(() => {
    function f() {
      console.log(availableCardsIds);
      const cards = [];
      for (const card of allCards) {
        if (availableCardsIds.indexOf(card.id) != -1) {
          cards.push(card);
        } else {
          console.log("Excluding ", card.id);
        }
      }
      setAvailableCards(cards);
      // setCards(e.data.split(","));
    }
    f();
  }, [allCards, availableCardsIds, setAvailableCards]);

  return (
    <div>
      <div className="cards">
        <h2 className="text-center">Select a card</h2>
        {availableCards &&
          availableCards.map((card) => {
            console.log("A");
            return (
              <Link key={card.id} to={`/game/${card.id}`}>
                <Card4 key={card.id} id={card.id} nums={card.numbers} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Cards;
