import App from "./App.js";

let instance = null;
class Singleton{
  constructor(){
    if(instance) return instance;
    this.app = new App(document.querySelector('#app'));
    instance = this;
  }
}
 
// 인스턴스가 여러개 만들어지는 오류 해결
let firstSingleton = new Singleton();
let secondSingleton = new Singleton();