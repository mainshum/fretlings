import React from "react";
import "./App.css";
import Grid from "./grid/grid";
import randomService from "./services/random";

function App() {
  return (
    <div className="App">
      <Grid randomService={randomService(Math.random)} frets={15} />
    </div>
  );
}

export default App;
