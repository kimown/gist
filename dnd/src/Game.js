/**
 * Created by google on 16-12-11.
 */


export function observe(receive) {
    setInterval(() => receive([
        Math.floor(Math.random() * 8),
        Math.floor(Math.random() * 8)
    ]), 500);
}