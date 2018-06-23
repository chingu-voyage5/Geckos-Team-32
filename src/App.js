import React, { Component } from "react";
import "./App.css";
import Clock from "./components/clock";
import SearchBar from "./components/searchbar";
import Photos from "./components/background/index";
import Links from "./components/quicklinks";
import Navbar from "./components/navbar";

class App extends Component {
  state = {
    isDealingWithLinks: false
  };

  // Change state of isDealingWithLinks - handle show/hide state of link container
  changeLinkState = () =>
    this.setState({ isDealingWithLinks: !this.state.isDealingWithLinks });

  render() {
    return (
      <div className="App">
        {/* conditional rendering: render if state.isDealingWithLinks = true  */}
        {this.state.isDealingWithLinks ? (
          <Links changeLinkState={this.changeLinkState} />
        ) : null}
        <Photos />
        <Clock />
        <SearchBar />
        <Navbar
          changeLinkState={this.changeLinkState} //
          isDealingWithLinks={this.state.isDealingWithLinks}
        />
      </div>
    );
  }
}

export default App;
