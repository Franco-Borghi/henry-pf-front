import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from './redux/store';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

// const domain = process.env.AUTH0_DOMAIN;
// const clientId = process.env.AUTH0_CLIENT_ID;

// console.log({
//   domain,
//   clientId
// });

root.render(
  <React.StrictMode>
    <Auth0Provider domain={process.env.REACT_APP_AUTH0_DOMAIN} clientId={process.env.REACT_APP_AUTH0_CLIENT_ID} authorizationParams={{redirect_uri: window.location.origin}} >
      <Provider store={store}>
      <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
