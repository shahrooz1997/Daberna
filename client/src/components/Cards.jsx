import { useState, useEffect } from "react";
import Card from "../components/Card";
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
      <div className="card">
        <h2 className="text-center">Cards</h2>
        {cards &&
          cards.map((card) => {
            return (
              <a key={card.id} href="/game">
                <Card
                  key={card.id}
                  id={card.id}
                  number_placement={card.numbers}
                />
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default Cards;
