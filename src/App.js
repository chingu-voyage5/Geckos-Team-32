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
        <div className="greyOverlay">
          <Links />
          <Photos />
          <Clock />
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default App;
