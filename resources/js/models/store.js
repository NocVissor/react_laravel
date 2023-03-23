import { makeAutoObservable } from "mobx"
var defaultCode = (typeof code === 'undefined')?200:code;
class Store {
  constructor() {
    makeAutoObservable(this)
  }
  user = null;
  setUser(user){
    this.user = user;
  }
  code = defaultCode;
}

export default new Store();
