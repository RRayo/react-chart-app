import logo from "./logo.svg";
import "./App.css";
import InvestmentEvolutions from "./InvestmentEvolutions";
import { useEffect, useState } from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <InvestmentEvolutions />
      </header>
    </div>
  );
}

export default App;
