/**
 * Created by kimown on 16-9-26.
 */

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello " + person.firstName + "--" + person.lastName;
}

// let user = {firstName: 'joey', lastName: 'zhou11'};


class Student {
    fullName: string;

    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + '--' + middleInitial + '--' + lastName;
    }
}

let user = new Student('i', 'am', 'hungry');
console.log(greeter(user));


/**
 * http://www.typescriptlang.org/docs/handbook/basic-types.html
 *
 * @type {boolean}
 */

// initial assign a value
let isDone: boolean = true;
console.log(isDone);

let color: string = 'I am just a string,so do I';
console.log(color);

let tmp = 'i am tmp string';
let fullName: string = `my node version is ${tmp}`;
console.log(fullName);

let age: number = 24;
console.log(age);

let list: number[] = [111, 222, 3333];

let anyList: any[] = [1, '22', false];
console.log(list);

let x: [string,number] = ['11----1', 2, ''];
console.log(x[0]);
console.log(x[1]);


//枚举类型是为了数字类型设置的，为了防止magic number
enum china{
    chinaMobile = 10086,
    chinaUnicom = 10010
}
enum test{
    aa = 233, bb, cc
}
console.log(china[10086] + "------======");


// for function

function warnUser(): number[] {
    return [1];
}


let someValue: any = ['1', '2---', '333', 111];
let strLength: number = (<number[]>someValue).length;

console.log(strLength);


let a = 100;
// js scope problem
function foo() {
    return a;
}

console.log('----------------' + foo());

// for (let i = 0; i < 10; i++) {
//     setTimeout(()=> {
//         console.log(i);
//     }, 100 * i);
// }


let o = {
    aaa: 'foo',
    b: 'bar'
};
let {aaa, b}:{aaa: string,b: string}=o;
console.log(aaa);

function keepWholeObject(wholeObject: {a: string,b?: number}) {
    let {a, b = 2333}=wholeObject;
    console.log('----' + a + "----" + b);
}

keepWholeObject({a: '10086'});

function printLabel(labelledObj: {label: string}) {
    console.log(labelledObj.label);
}

let labelObj = {label: 'label\'s key'};
printLabel(labelObj);

interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string;area: number} {

    return {
        color: '',
        area: 2333
    };
}

let mySquare = createSquare({width: 233, color: '11'});


interface SearchFunc {
    (source: string, substring: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (source: string, substring: string) {
    return source.includes(substring);
}

console.log(mySearch('123@456', '@456'));







