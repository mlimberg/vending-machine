// const treats = require('./treats.js');

// export default
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
      this.handleReset()
    }
    return treat.name
  }

  handleReset() {
    this.giveChange(this.state.change);
    this.resetState()
  }

  giveChange(amt){
    console.log(treats)
    return amt
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
