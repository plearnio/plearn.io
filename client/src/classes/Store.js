class Store {
  constructor(name) {
    this.name = name
    this.store = {}
  }

  set setStore(store) {
    this.store = store
  }

  get getStore() {
    return this.store
  }
}

export default Store
