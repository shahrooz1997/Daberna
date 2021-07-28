import CardElement from "./CardElement";
import "../../styles/card2.css";

const CardColumn = (props) => {
  const { colInfo } = props;

  return (
    <div className="columnCard">
      {colInfo.map((el, i) => {
        return <CardElement key={i} id={el[0]} num={el[1]} isCovered={el[2]} />;
      })}
    </div>
  );
};

export default CardColumn;
