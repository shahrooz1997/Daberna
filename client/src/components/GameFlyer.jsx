import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import * as gameApi from "../apis/game";
import * as actions from "../store/actions";

const GameFlyer = ({ gameid, creatorName, bet }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const joinGame = async () => {
    try {
      const res = await gameApi.joinGame(gameid);
      console.log("joined " + gameid);
      dispatch(actions.joinGame(gameid));
      history.push("/selectcard");
    } catch (e) {
      console.log("e");
      console.log(e);
      console.log("e2");
    }
  };

  return (
    <div
      className="d-flex flex-column flex-wrap p-2 m-2 rounded gameFlyer"
      onClick={(e) => {
        e.preventDefault();
        joinGame();
      }}
    >
      <div className="d-flex flex-column mb-3">
        <div className="align-self-start">
          <p className="m-0">Created by:</p>
        </div>
        <div className="align-self-end">{creatorName}</div>
      </div>
      <div className="d-flex flex-column">
        <div className="align-self-start">
          <p className="m-0">Bet per card:</p>
        </div>
        <div className="align-self-end">${bet}</div>
      </div>
    </div>
  );
};

export default GameFlyer;
