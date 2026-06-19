// class Userinfo {
//     constructor(public name: string, public age: number, public gender: string, public faculty: string){
//         if(!faculty){
//             this.faculty = "Not Provided"
//         }
//     }
// }

// let u1 = new Userinfo("rafay", 19, "male", "")
// console.log(u1);

// Constructor with extends------------------------------------------------------------------------

// class BottleMaker {
//     constructor(public bottleName: string){}
// }

// class MetalBottleMaker extends BottleMaker {
//     constructor(bottleName: string){
//         super(bottleName)
//     }
//     changeValue(){
//         this.bottleName = "pepsi"
//     }
// }

// let m1 = new MetalBottleMaker("coca cola")
// m1.changeValue()
// console.log(m1);

// Contructor with getter and setter----------------------------------------------------------------------------------------------------------------------------------------------------------

class User {
    constructor(public _name: string, public age: number ){

    }
    get name (){
        return this._name
    }

    set name (value: string){
        this._name = value
    }
}

let u1 = new User("Abdul",18)
console.log("u1");

