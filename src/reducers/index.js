import heroesReducer from "./heroesReducer";
import modalReducer from "./modalReducer";
import toastReducer from "./toastReducer";

import { combinedReducers, combineReducers } from "redux";

const allReducers = combineReducers({
  heroes: heroesReducer,
  modal: modalReducer,
  toast: toastReducer
});

export default allReducers;
