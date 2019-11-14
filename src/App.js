import React from "react";
import Header from "./components/Header";
import Battle from "./components/Battle";
import HeroList from "./components/HeroList";
import ModalBox from "./components/ModalBox";
import Toast from "./components/Toast";
import LandingPage from "./components/LandingPage/LandingPage";

import bg from "./assets/img/background.png";
// Router
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

//Redux
import { createStore } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";

/* import EnemyCreator from "./components/EnemyCreator"; */
import "./styles/App.scss";

//set up Redux store
const store = createStore(allReducers);

function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <Provider store={store}>
        <Router>
          <header>
            <Header />
          </header>
          <ModalBox />
          <Toast />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/heldengruppe" component={HeroList} />
            <Route path="/kampfmanager" component={Battle} />
            {/* <Route path="/enemy" component={EnemyCreator} /> */}
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
