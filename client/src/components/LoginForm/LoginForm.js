import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import logoWhite from "../../images/logoWhiteTxt.svg";
import { API_BASE_URL } from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";

function LoginForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    props.updateUserEmail(state.email);
    const payload = {
      email: state.email,
      password: state.password,
    };
    axios
      .post(API_BASE_URL + "/user/login", payload)
      .then(function (response) {
        console.log("The payload ",payload);
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "Login lyckades. Omdirigeras till startsidan..",
          }));
          redirectToMenu();
          props.showError(null);
        } else if (response.status === 204) {
          props.showError("Fel email/lösenord");
        } else {
          props.showError("Fel email/lösenord");
        }
      })
      .catch(function (error) {
        if (error.response.data.message === "error") {
            props.showError("Fel email/lösenord. Försök igen.");
        }
      });
  };
  const redirectToMenu = () => {
    props.updateTitle("Menu");
    props.history.push("/menu");
  };
  const redirectToRegister = () => {
    props.history.push("/register");
    props.updateTitle("Register");
  };
  return (
    <div className="container container-bg">
      <img src={logoWhite} className="App-logo" alt="logo" />
      <div className="outer-div">
        <h1 className="white-text">Logga in</h1>
        <form>
          <input
            type="email"
            className="input-field"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Epostaddress"
            value={state.email}
            onChange={handleChange}
          />
          <input
            type="password"
            className="input-field"
            id="password"
            placeholder="Lösenord"
            value={state.password}
            onChange={handleChange}
          />
          <div className="form-check"></div>
          <button
            type="submit"
            className="submit-btn"
            onClick={handleSubmitClick}
          >
            Logga in
          </button>
        </form>
        <div
          className="alert alert-success mt-2"
          style={{ display: state.successMessage ? "block" : "none" }}
          role="alert"
        >
          {state.successMessage}
        </div>
        <div className="message-box">
          <span>Skapa konto? </span>
          <span className="loginText" onClick={() => redirectToRegister()}>
            Registrera
          </span>
        </div>
      </div>
      <div className="green-box" />
    </div>
  );
}

export default withRouter(LoginForm);
