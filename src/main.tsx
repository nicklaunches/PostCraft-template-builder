import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/globals.css";

/**
 * Application entry point.
 *
 * Mounts the React application to the DOM root element with StrictMode enabled
 * for development checks and warnings.
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
