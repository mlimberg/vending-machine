class Person {
  constructor() {
    this.state = {
      credits: 500,
      selection: '',
      treat: ''
    }
  }

  insertCredits(amt) {
    this.state.credits -= amt;
    return amt
  }

  makeSelection(selection) {
    this.state.selection = selection;
    return selection
  }

  receiveChange(amt) {
    this.state.credits += amt
  }

  receiveTreat(treat)  {
    this.state.treat = treat
  }

  reset() {
    this.constructor()
  }
}

if(typeof module !== 'undefined') {
  module.exports.default = Person
}
