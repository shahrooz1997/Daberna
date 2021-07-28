import coverPic from "../../assets/cover.png";
import { useState } from "react";
import "../../styles/card2.css";
import { useSelector } from "react-redux";

function isCovered(index, coveredIndecies) {
  let covered = coveredIndecies.find((n) => index === n) || false;
  if (covered !== false) {
    covered = true;
  }
  return covered;
}

const CardElement = (props) => {
  const { num } = props;
  const isPlaying = useSelector((state) => state.card.selectedCard) !== null;
  const [covered, setCovered] = useState();

  const toggleCover = () => {
    if (isPlaying) {
      setCovered(!covered);
    }
  };

  return (
    <div className="cardElement" onClick={toggleCover}>
      <div>{covered ? <img src={coverPic} alt={""} /> : num}</div>
    </div>
  );
};

export default CardElement;
