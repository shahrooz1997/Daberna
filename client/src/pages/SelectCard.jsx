import { useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import Cards from "../components/Cards";
import Header from "../components/Header";
import Info from "../components/Info";

const SelectCard = () => {
  // const [ws, setWs] = useStore(null);
  const ws = useSelector((state) => state.game.ws);

  // useEffect(() => {
  //   ws.send("BBBBB333BB");
  // }, [ws]);

  return (
    <div>
      <Header />
      <Info />
      <Cards />
    </div>
  );
};

export default SelectCard;
