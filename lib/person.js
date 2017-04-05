export default class Person {
  constructor() {
    this.state = {
      credits: 500,
      selection: ''
    }
  }

  insertCredits(amt) {
    this.state.credits -= amt;
    return amt;
  }

  makeSelection(selection) {
    this.state.selection = selection;
    return selection
  }

}
