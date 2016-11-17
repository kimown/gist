/**
 * Created by joey on 13/11/2016.
 */


const flat = {}

const array = [[0, 1], [2, 3], [4, 5]]
const result = array.reduce((memo, item, index) => {
  const flatten = memo.concat(item)
  flat[index] = flatten
  return flatten
})

console.log(flat)



console.log(foo)
const foo = function foo() {
    return null
}

const ar = [1, 2, 3]
    ar.map(function (x) {
    const y = x + 1;
    console.log(x + y)
    return x * y;
});

console.error(y)

ar.map((x) => {
    const y = x + 1;
    console.log(x + '-----' + y)
    return x * y;
});

const ab = [1, 22, 333]
const ba = [...ab]