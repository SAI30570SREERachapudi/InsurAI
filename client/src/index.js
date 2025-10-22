import React from "react";
// import ReactDOM from "react-dom";
import "./index.css"; // Import Tailwind or other CSS
import App from "./App.js";
import ReactDOM from "react-dom/client";
import "./i18n"; // import i18n config

// ReactDOM.render(<App />, document.getElementById("root"));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
