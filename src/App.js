import React, { Component } from 'react';
import './App.css';
import Clock from './components/clock';
import SearchBar from './components/searchbar'
import Photos from './components/background/index';

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
      </div>
    );
  }
}

export default App;
