import { React, useState, useRef, useMemo } from "react";
import logo from "../../images/logo.svg";
import "./NewForest.css";
import { withRouter } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import axios from "axios";
import { API_BASE_URL } from "../../constants/apiConstants";
import DraggableMarker from "../Draggable/Draggable"


const center = {
  lat: 62.51193074415761,
  lng: 15.9481670685492,
};

let coordinates = {
  lat: 62.51193074415761,
  lng: 15.9481670685492,
};

function NewForest(props) {
  const [position, setPosition] = useState(center);

  const positionValue = (e) => {
    e.preventDefault();
    console.log("The console position ",position);
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
       const payload = {
      email: props.userEmail,
      coordinates: position
    };
    console.log(payload)
    axios
      .post(API_BASE_URL + "/user/saveforest", payload)
      .then(function (response) {
        if (response.status === 200) {
          console.log("Log in successful")
          props.showError(null);
        } else if (response.status === 204) {
          props.showError("Fel email/lösenord");
        } else {
          props.showError("Fel email/lösenord");
        }
      })
      .catch(function (error) {
        console.log(error.response);
        if (error.response.data.message === "error") {
          props.showError("Fel email/lösenord. Försök igen.");
        }
      });
  };
  return (
    <div>
      <MapContainer
        className="markercluster-map"
        center={center}
        zoom={5}
        maxZoom={18}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <DraggableMarker position={position} setPosition={setPosition} />

      </MapContainer>
      <button
        type="submit"
        className="submit-btn"
        onClick={handleSubmitClick}
      >
        Spara Skogen
      </button>
      <button
        type="submit"
        className="submit-btn"
        onClick={positionValue}
      >
        Position value
      </button>
    </div>
  );
}






export default withRouter(NewForest);
