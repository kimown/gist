import React from 'react';
import ReactDOM from 'react-dom';
import Board from './chess/Board'
import './index.css';
import { observe } from './Game';

// ReactDOM.render(
//     <Board knightPosition={[4, 7]}/>
//   ,
//   document.getElementById('root')
// );

const rootEl = document.getElementById('root');

observe(knightPosition =>
    ReactDOM.render(
        <Board knightPosition={knightPosition} />,
        rootEl
    )
);