import React from "react";
import Battle from "./components/Battle";
import HeroList from "./components/HeroList";

//Redux
import { createStore } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";

//set up Redux store
const store = createStore(allReducers);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HeroList />
        <Battle />
      </Provider>
    </div>
  );
}

export default App;
