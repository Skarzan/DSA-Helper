import heroesReducer from "./heroesReducer";
import modalReducer from "./modalReducer";

import { combinedReducers, combineReducers } from "redux";

const allReducers = combineReducers({
  heroes: heroesReducer,
  modal: modalReducer
});

export default allReducers;
