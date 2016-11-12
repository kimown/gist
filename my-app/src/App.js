import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import test from './test'

test()

const original = { a: 1, b: 2 }
const copy = { ...original, c: 33 }
console.log(copy)

class Queue {
    constructor(contents = []) {
        this.queue = [...contents]
    }
}
const a = new Queue([1, 22, 333])
window.a = a

class PeekableQueue extends Queue {

}


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
