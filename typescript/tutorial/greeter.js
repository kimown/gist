;
var Student = (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + middleInitial + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person;
}
// let user={firstName:'zhou',lastName:'chongxing',firstName1:"111",firstName2:'ddd'};
// boolean
var user = new Student('joey', '-', 'zhou');
console.log(greeter(user));
var isDone = true;
console.log(isDone);
// string
var color = 'blue123';
console.log(color);
color = 'white';
console.log(color);
var templateStr = "--------" + color + "======";
console.log(templateStr);
var age = 24;
var list = [1, 2, 3, 4];
var china;
(function (china) {
    china[china["mobile"] = 10086] = "mobile";
    china[china["unicom"] = 10010] = "unicom";
})(china || (china = {}));
console.log(china.mobile);
var c = china.unicom;
console.log(c);
var someValue = ['this is a string'];
var stringlength = someValue.length;
console.log(stringlength);
//# sourceMappingURL=greeter.js.map