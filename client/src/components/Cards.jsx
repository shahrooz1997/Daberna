import { useState, useEffect } from "react";
import Card4 from "./Card4";
import CardsFinder from "../apis/CardsFinder";
import "../styles/card.css";

const Cards = () => {
  const [cards, set_cards] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await CardsFinder.get("/");
        set_cards(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div>
      <div className="cards">
        <h2 className="text-center">Cards</h2>
        {cards &&
          cards.map((card) => {
            return (
              <a key={card.id} href="/game">
                <Card4 key={card.id} id={card.id} nums={card.numbers} />
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default Cards;
