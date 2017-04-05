// const regeneratorRuntime = require("regenerator-runtime");
// const treats = require('./treats.js');

class VendingMachine {
  constructor() {
    this.state = {
      status: "idle",
      credits: 0,
      change: 0,
      selection: null,
    }

    this.treats = treats
  }

  addCredit(amt) {
    this.state.credits = amt;
    this.state.status = 'credited';
  }

  setSelection(selection) {
    if(Object.keys(treats).includes(selection)) {
      this.state.selection = selection;
      this.checkCredits()
    } else {
      this.state.status = 'invalid entry'
    }
  }

  checkCredits() {
    const { credits, selection } = this.state;
    const treatPrice = this.treats[selection][0].price;

    if(credits < treatPrice) {
      const difference = treatPrice - credits;
      return this.notEnoughCredits(difference);
    } else {
      this.state.change = credits - treatPrice;
      this.dispenseTreat();
    }
  }

  notEnoughCredits(amt) {
    this.state.status = 'more credits needed'
    return `Insufficient funds, please add ${amt} more credits`
  }

  dispenseTreat() {
    const treat = this.treats[this.state.selection].shift();

    if(this.state.change > 0) {
      this.state.status = 'dispensing change'
      this.giveChange()
    }
    return treat.name
  }

  giveChange() {
    const changeBack = this.state.change;
    this.resetState();
    return changeBack;
    // const reset = this.resetState();
    //
    // function *returnChange() {
    //   yield change
    //   return reset
    // }
    //
    // const issueChange = returnChange();
    //
    // this.state.person.receiveChange(issueChange.next().value)
    // issueChange.next()
  }

  resetState() {
    this.state.status = "idle";
    this.state.credits = 0;
    this.state.change = 0;
    this.state.selection = null;
  }

  reset() {
    this.constructor()
  }
}
