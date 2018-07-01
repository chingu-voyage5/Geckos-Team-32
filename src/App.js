import React, { Component } from "react";
import "./App.css";
import Clock from "./components/clock";
import SearchBar from "./components/searchbar";
import Photos from "./components/background/index";
import Links from "./components/quicklinks";
import Navbar from "./components/navbar";
import Translator from "./components/translator";

class App extends Component {
  state = {
    isDealingWithLinks: false,
    isDealingWithTranslate: false
  };

  // Change state of isDealingWithLinks - handle show/hide state of link container
  changeLinkState = () =>
    this.setState({ isDealingWithLinks: !this.state.isDealingWithLinks });

  // Change state of isDealingWithTranslate - handle show/hide state of translator
  changeTranslateState = () =>
    this.setState({
      isDealingWithTranslate: !this.state.isDealingWithTranslate
    });

  render() {
    return (
      <div className="App">
        {/* conditional rendering: render if state.isDealingWithLinks = true  */}
        {this.state.isDealingWithLinks ? (
          <Links changeLinkState={this.changeLinkState} />
        ) : null}
        <Photos />
        <Clock />
        {this.state.isDealingWithTranslate ? <Translator /> : <SearchBar />}
        <Navbar
          changeLinkState={this.changeLinkState}
          isDealingWithLinks={this.state.isDealingWithLinks}
          changeTranslateState={this.changeTranslateState}
          isDealingWithTranslate={this.state.isDealingWithTranslate}
        />
      </div>
    );
  }
}

export default App;
