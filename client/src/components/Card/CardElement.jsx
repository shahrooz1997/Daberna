import coverPic from "../../assets/cover.png";
import { useState } from "react";
import "../../styles/card2.css";
import { useSelector } from "react-redux";

const CardElement = (props) => {
  const { id, num } = props;
  let { isCovered } = props;
  const isPlaying = useSelector((state) => state.card.selectedCard) !== null;
  // const [covered, setCovered] = useState(isCovered);
  const [content, setContent] = useState(
    isCovered === true ? <img src={coverPic} alt={""} /> : num
  );

  const toggleCover = () => {
    if (isPlaying) {
      isCovered = !isCovered;
      setContent(isCovered === true ? <img src={coverPic} alt={""} /> : num);
    }
  };

  return (
    <div className="cardElement" onClick={toggleCover}>
      <div>{content}</div>
    </div>
  );
};

// CardElement.defaultProps = {
//   id: 12,
// };

export default CardElement;
