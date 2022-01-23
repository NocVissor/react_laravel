import { makeAutoObservable } from "mobx"
var defaultCode = (typeof code === 'undefined')?200:code;
class Store {
  constructor() {
    makeAutoObservable(this)
  }
  user = null;
  code = defaultCode;
}

export default new Store();
