import React, { Component } from 'react';
import './App.css';
import Photos from './components/background/index';

console.log(process.env.REACT_APP_UNSPLASH_KEY);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="greyOverlay">
          <Photos />
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            Hello Codecademy!
          </p>
        </div>
      </div>
    );
  }
}

export default App;
