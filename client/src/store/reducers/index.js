import { combineReducers } from "redux";
import cardReducer from "./card";
import gameReducer from "./game";
import userReducer from "./user";

const rootReducer = combineReducers({
  card: cardReducer,
  game: gameReducer,
  user: userReducer,
});

export default rootReducer;
