// const treats = require('./treats.js');

// export default
class VendingMachine {
  constructor() {
    this.state = {
      status: "idle",
      credits: 0,
      change: 0,
      selection: null,
      treat: ''
    }
    this.treats = treats
  }

  addCredit(amt) {
    this.state.credits = amt;
    this.state.status = 'credited';
  }

  setSelection(selection) {
    if(treats[selection].length === 0) {
      this.state.selection = '';
      return this.state.status = 'out of stock';
    }
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
      this.state.status = 'vending';
      this.state.change = credits - treatPrice;
      this.dispenseTreat();
    }
  }

  notEnoughCredits(amt) {
    this.state.status = `${amt} more credits needed`
  }

  dispenseTreat() {
    const { selection } = this.state;

    if(this.treats[selection].length > 0) {
      const treat = this.treats[this.state.selection].shift();
      if(this.state.change > 0) {
        this.giveChange()
      }
      this.state.treat = treat.name;
    } else {
      console.log('out of stock!');
      this.state.selection = '';
      this.state.status = 'out of stock';
    }
  }

  giveChange(amt){
    return this.state.change
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
