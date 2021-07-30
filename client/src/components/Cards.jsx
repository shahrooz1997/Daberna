import { useState, useEffect } from "react";
import Card4 from "./Card4";
import CardsFinder from "../apis/CardsFinder";
import "../styles/card.css";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import { Link } from "react-router-dom";

const Cards = () => {
  const [cards, set_cards] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCards = async () => {
      // dispatch(actions.init());
      try {
        const res = await CardsFinder.get("/");
        set_cards(res.data);
        dispatch(actions.getCards(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchCards();
  }, [dispatch]);

  return (
    <div>
      <div className="cards">
        <h2 className="text-center">Select a card</h2>
        {cards &&
          cards.map((card) => {
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
