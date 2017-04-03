export default class Person {
  constructor() {
    this.state = {
      credits: 500
    }
  }

  insertCredit(value) {
    this.state -= value;
    return value
  }

  makeSelection(choice) {
    return choice;
  }
}
