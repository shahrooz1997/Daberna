import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import Cards from "../components/Cards";
import Header from "../components/Header";
import Info from "../components/Info";
import connectWS from "../apis/connectWS";
import Card4 from "../components/Card4";
import { Link } from "react-router-dom";
import * as actions from "../store/actions";
import { useHistory } from "react-router-dom";
import * as gameApi from "../apis/game";

const SelectCard = () => {
  const [allCards, setAllCards] = useState(null);
  const [availableCards, setAvailableCards] = useState([]);
  const [availableCardsIds, setAvailableCardsIds] = useState(null);
  const history = useHistory();

  // WebSocket
  const dispatch = useDispatch();
  const ws = useSelector((state) => state.game.ws);
  const loggedIn = useSelector((state) => state.user.isLoggedIn);
  useEffect(() => {
    if (!loggedIn || availableCardsIds !== null || allCards != null) {
      return;
    }
    const massageHandler = (msg) => {
      // console.log("M received");
      // console.log(msg);
      const data = JSON.parse(msg.data);
      const type = data.type;
      const payload = data.payload;
      if (type === "allCards") {
        // console.log("allCards");
        // console.log(payload.cards);
        setAllCards(payload.cards);
        dispatch(actions.getAllCards(payload.cards));
      } else if (type === "availableCardsIds") {
        // console.log("availableCardsIds");
        // console.log(payload.availableCardsIds);
        setAvailableCardsIds(payload.availableCardsIds);
      }
    };
    return connectWS(
      ws,
      dispatch,
      massageHandler,
      { type: "availableCards", payload: {} },
      { type: "availableCardsStop", payload: {} }
    );
  }, [
    loggedIn,
    dispatch,
    ws,
    setAllCards,
    setAvailableCardsIds,
    availableCardsIds,
  ]);

  useEffect(() => {
    if (allCards === null || availableCardsIds === null) {
      return;
    }
    (function () {
      const cards = [];
      for (const card of allCards) {
        if (availableCardsIds.indexOf(parseInt(card.id)) != -1) {
          cards.push(card);
        } else {
          console.log("Excluding ", card.id);
        }
      }
      setAvailableCards(cards);
    })();
  }, [allCards, availableCardsIds, setAvailableCards]);

  const selectCard = async (cardId) => {
    try {
      const res = await gameApi.selectCard({ cardId });
      dispatch(actions.selectCard(cardId));
      history.push(`/game`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Header updateInfo={false} />
      <Info hasStarted={false} updateInfo={false} />
      <div>
        <div className="cards">
          <h2 className="text-center">Select a card</h2>
          {availableCards &&
            availableCards.map((card) => {
              return (
                // <Link key={card.id} to={`/game/${card.id}`}>
                //   <Card4 key={card.id} id={card.id} nums={card.numbers} />
                // </Link>
                <div
                  key={card.id}
                  onClick={(e) => {
                    selectCard(card.id);
                    e.preventDefault();
                  }}
                >
                  <Card4 key={card.id} id={card.id} nums={card.numbers} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SelectCard;
