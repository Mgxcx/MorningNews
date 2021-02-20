import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import wishlist from "./reducers/article";
import token from "./reducers/token";
import language from "./reducers/language";
import { Provider } from "react-redux";

import { createStore, combineReducers } from "redux";
import "./App.css";
import ScreenHome from "./ScreenHome";
import ScreenArticlesBySource from "./ScreenArticlesBySource";
import ScreenMyArticles from "./ScreenMyArticles";
import ScreenSource from "./ScreenSource";

const store = createStore(combineReducers({ wishlist, token, language }));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={ScreenHome} />
          <Route path="/screensource" component={ScreenSource} />
          <Route path="/articlesbysource/:id" component={ScreenArticlesBySource} />
          <Route path="/myarticles" component={ScreenMyArticles} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
