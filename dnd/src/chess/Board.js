/**
 * Created by google on 16-12-11.
 */


import React, { Component, PropTypes } from 'react';
import Square from './Square';
import Knight from './Knight';
import { moveKnight } from '../Game';


export default class Board extends Component {
    renderSquare(i) {
        const x = i % 8;
        const y = Math.floor(i / 8);
        const black = (x + y) % 2 === 1;

        const [knightX, knightY] = this.props.knightPosition;
        const piece = (x === knightX && y === knightY) ?
            <Knight /> :
            <div style={{opacity:0}}>12</div>;

        return (
            <div key={i}
                 style={{ width: '12.5%', height: '12.5%' }}
                 onClick={() => this.handleSquareClick(x, y)}
            >

                <Square style={{
                   width: '100%',
                    height: '100%'
                }} black={black}>
                    {piece}
                </Square>
            </div>
        );
    }

    render() {
        const squares = [];
        for (let i = 0; i < 64; i++) {
            squares.push(this.renderSquare(i));
        }

        return (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                {squares}
            </div>
        );
    }

    handleSquareClick(toX, toY) {
        moveKnight(toX, toY);
    }


}
