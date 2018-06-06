import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/searchbar'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Hello Codecademy!
          <SearchBar />
        </p>
      </div>
    );
  }
}

export default App;
