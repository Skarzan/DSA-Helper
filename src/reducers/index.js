import heroesReducer from "./heroesReducer";

import { combinedReducers, combineReducers } from "redux";

const allReducers = combineReducers({
  heroes: heroesReducer
});

export default allReducers;
