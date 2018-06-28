import React, { Component } from 'react';
import './App.css';
import Clock from './components/clock';
import SearchBar from './components/searchbar';
import Photos from './components/background/index';
import Translator from './components/translator';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Photos />
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Clock />
        <SearchBar />
        <Translator />
      </div>
    );
  }
}

export default App;
