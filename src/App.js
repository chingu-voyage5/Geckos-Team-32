import React, { Component } from "react";
import "./App.css";
import Clock from "./components/clock";
import SearchBar from "./components/searchbar";
import Photos from "./components/background/index";
import Links from "./components/quicklinks";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Links />
        <Photos />
        <Clock />
        <SearchBar />
      </div>
    );
  }
}

export default App;
