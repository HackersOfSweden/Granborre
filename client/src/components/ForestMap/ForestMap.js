import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import logo from "../../images/logo.svg";
import { API_BASE_URL } from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";
import { loadModules } from "esri-loader";
import "./ForestMap.css";

const WebMapView = (props) => {
  const mapRef = useRef();
  const center = { lat: 0.0, lng: 0.0 };
  /* const [coordinates, setCoordinates] = useState(center); */

  if(center.lat === 0 && center.lng === 0) {
      axios
        .get(API_BASE_URL + "/user/getcoordinates", {
          headers: {
            /* token: localStorage.getItem("login_access_token"), */
            email: props.userEmail,
          },
        })
        .then(function (response) {
          if (response.status === 200) {
            /* setCoordinates(response.data.response.coordinates); */
            center.lat = response.data.response.coordinates.lat;
            center.lng = response.data.response.coordinates.lng;
            loadMap(center);
          }
        })
        .catch(function (error) {
          if (error) {
            props.showError("Kunde inte hämta koordinatater");
          }
        });
  }

  function loadMap(center) {
    console.log("The coordinates in load map are ",center);
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(["esri/Map", "esri/views/MapView"], { css: true }).then(
      ([ArcGISMap, MapView]) => {
        const map = new ArcGISMap({
          basemap: "satellite",
        });
        // load the map view at the ref's DOM node

        console.log(center.lat, center.lng)
        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [center.lng, center.lat],
          zoom: 13,
        });
        return () => {
          if (view) {
            // destroy the map view
            view.destroy();
          }
        };
      }
    );
  };
  return <div className="webmap" ref={mapRef} />;
};


export default withRouter(WebMapView);
