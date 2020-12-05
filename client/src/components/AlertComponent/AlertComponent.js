import React, { useState, useEffect } from "react";
import "./AlertComponent.css";
function AlertComponent(props) {
  const [modalDisplay, toggleDisplay] = useState("none");
  const openModal = () => {
    toggleDisplay("flex");
  };
  const closeModal = () => {
    toggleDisplay("none");
    props.hideError(null);
  };
  useEffect(() => {
    if (props.errorMessage !== null) {
      openModal();
    } else {
      closeModal();
    }
  });

  return (
    <div
      className={"alert alert-danger alert-dismissable mt-4"}
      role="alert"
      id="alertPopUp"
      style={{ display: modalDisplay }}
    >
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={() => closeModal()}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="d-flex alertMessage">
        <p className="errorHeader">Felmeddelande</p>
        <span className="errorMessage">{props.errorMessage}</span>
      </div>
    </div>
  );
}
export default AlertComponent;
