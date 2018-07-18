import React, { Component } from 'react';
import './App.css';
import Clock from './components/clock';
import SearchBar from './components/searchbar';
import Photos from './components/background/index';
import Links from './components/quicklinks';
import Navbar from './components/navbar';
import Translator from './components/translator';
import Notes from './components/stickynotes';

class App extends Component {
  state = {
    isDealingWithLinks: false,
    isDealingWithTranslate: false,
    isDealingWithNotes: false
  };

  // Change state of isDealingWithLinks - handle show/hide state of link container
  changeLinkState = () =>
    this.setState({ isDealingWithLinks: !this.state.isDealingWithLinks });

  // Change state of isDealingWithTranslate - handle show/hide state of translator
  changeTranslateState = () =>
    this.setState({
      isDealingWithTranslate: !this.state.isDealingWithTranslate
    });

  // Change state of isDealingWithLinks - handle show/hide state of link container
  changeNotesState = () =>
    this.setState({ isDealingWithNotes: !this.state.isDealingWithNotes });

  render() {
    return (
      <div className="App">
        {/* conditional rendering: render if state.isDealingWithLinks = true  */}
        {this.state.isDealingWithLinks ? <Links /> : null}
        <Photos />
        <Clock />
        {this.state.isDealingWithNotes ? <Notes /> : null}
        {this.state.isDealingWithTranslate ? <Translator /> : <SearchBar />}
        <Navbar
          changeNotesState={this.changeNotesState}
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
