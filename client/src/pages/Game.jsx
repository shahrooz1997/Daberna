import { useState } from "react";
import Header from "../components/Header";
import Card4 from "../components/Card4";

const Game = () => {
  const [number_placement, set_number_placement] = useState([
    [1, 3],
    [3, 52],
    [5, 59],
    [8, 15],
    [21, 85],
    [26, 55],
    [13, 53],
  ]);

  return (
    <div>
      <Header />
      <div className="text-center mb-3">
        <h2>Lucky number</h2>
        <h2>46</h2>
      </div>
      <h2 className="text-center">Your cards</h2>
      <div className="cards">
        <Card4 id={11} nums={number_placement} />
        {/* <Card4 id={11} nums={number_placement} /> */}
      </div>
    </div>
  );
};

export default Game;
