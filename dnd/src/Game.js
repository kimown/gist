/**
 * Created by google on 16-12-11.
 */

let knightPosition = [0, 0];
let observer = null;

function emitChange() {
    observer(knightPosition);
}

export function observe(o) {
    if (observer) {
        throw new Error('Multiple observers not implemented.');
    }

    observer = o;
    emitChange();
}

export function moveKnight(toX, toY) {
    knightPosition = [toX, toY];
    emitChange();
}