import React, { useState } from "react";
//import styled from 'styled-components';
import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AlertComponent from "./components/AlertComponent/AlertComponent";
import Menu from "./components/Menu/Menu";
import Analysis from "./components/Analysis/Analysis";
import NewForest from "./components/Map/NewForest";



function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact={true}>
            <RegistrationForm
              showError={updateErrorMessage}
              updateTitle={updateTitle}
            />
          </Route>
          <Route path="/register">
            <RegistrationForm
              showError={updateErrorMessage}
              updateTitle={updateTitle}
            />
          </Route>
          <Route path="/login">
            <LoginForm
              showError={updateErrorMessage}
              updateTitle={updateTitle}
            />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile updateTitle={updateTitle} />
          </Route>
          <Route path="/menu">
            <Menu updateTitle={updateTitle} />
          </Route>
          <Route path="/analys">
            <Analysis />
          </Route>
          <Route path="/newforest">
            <NewForest />
          </Route>
        </Switch>
        <AlertComponent
          errorMessage={errorMessage}
          hideError={updateErrorMessage}
        />
      </div>
    </Router>
  );
}
export default App;
