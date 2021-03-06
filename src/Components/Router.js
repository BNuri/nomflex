import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "Screens/Home";
import TV from "Screens/TV";
import Search from "Screens/Search";
import Header from "Components/Header";
import Detail from "Screens/Detail";
import Collection from "Screens/Collection";

export default () => (
  // eslint-disable-next-line no-unused-expressions
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" exact component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/show/:id" component={Detail} />
        <Route path="/collection/:id" component={Collection} />
        <Redirect from="*" to="/" />>
      </Switch>
    </>
  </Router>
);
