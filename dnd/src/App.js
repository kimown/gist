import React, { Component, PropTypes} from 'react';
import { DragSource } from 'react-dnd';
import logo from './logo.svg';
import './App.css';
import Card from './Card'
import CardPlus from './CardPlus'

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';



class App extends Component {
  render() {
    return (
      <div className="App">
          <CardPlus text="Write the docs" id="10086"/>
      </div>
    );
  }
}
// export default App;

export default DragDropContext(HTML5Backend)(App);

