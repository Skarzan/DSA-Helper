import React from "react";
import Header from "./components/Header";
import Battle from "./components/Battle";
import HeroList from "./components/HeroList";
import ModalBox from "./components/ModalBox";

// Router
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";

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
        <Router>
          <header>
            <Header />
          </header>
          <ModalBox />
          <Switch>
            <Route exact path="/" component={HeroList} />
            <Route path="/battle" component={Battle} />
            <Route
              component={() => <h1>404 - you looked in the wrong place</h1>}
            />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
