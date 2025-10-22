import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import image from "./image.png";

function App() {
  return (
    <>
      <div>
        <h1>Welcome to Insur AI</h1>
        <p>Your AI-powered insurance assistant</p>
      </div>
      <div>
        <button style={{ color: "Blue" }}>Get Started</button>
      </div>
      <br />
      <div>
        <img src={image} width="500px" height="400px" />
      </div>
    </>
  );
}

export default App;
