/**
 * problem:
 * http://stackoverflow.com/questions/34431923/error-ts2339-property-endswith-does-not-exist-on-type-string
 */
interface String {
    includes(searchString: string, position?: number): boolean;
}
;

interface Person {
    firstName: string;
    lastName: string;
}

class Student {
    fullName: string;

    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + middleInitial + lastName;
    }
}

function greeter(person: Person) {
    return "Hello, " + person;
}

// let user={firstName:'zhou',lastName:'chongxing',firstName1:"111",firstName2:'ddd'};

// boolean
let user = new Student('joey', '-', 'zhou');
console.log(greeter(user));

let isDone: boolean = true;
console.log(isDone);


// string
let color: string = 'blue123';
console.log(color);
color = 'white';
console.log(color);

let templateStr = `--------${color}======`;
console.log(templateStr);


let age: number = 24;

let list: number[] = [1, 2, 3, 4];

enum china{
    mobile = 10086,
    unicom = 10010
}

console.log(china.mobile);

let c: china = china.unicom;
console.log(c);

let someValue: any = ['this is a string'];

let stringlength = (someValue as any).length;
console.log(stringlength);