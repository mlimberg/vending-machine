export default class VendingMachine {
  constructor() {
    this.state = {
      status: "idle",
      credits: 0,
      change: 0,
      selection: null
    }

    this.treats = {
      A1: [{name: 'snickers', price: 75}, {name: 'snickers', price: 75}],
      A2: [{name: 'twix', price: 75}, {name: 'twix', price: 75}]
    }
  }

  addCredit(amt) {
    this.state.credits = amt;
    this.state.status = 'credited';
  }

  setSelection(selection) {
    this.state.selection = selection;
    this.checkCredits()
  }

  checkCredits() {
    const { credits, selection } = this.state;
    const treatPrice = this.treats[selection][0].price;

    if(credits < treatPrice) {
      const difference = treatPrice - credits
      return this.notEnoughCredits(difference)
    } else if (credits > treatPrice) {
      this.giveChange()
    } else {
      this.dispenseTreat()
    }
  }

  notEnoughCredits(difference) {
    this.state.status = 'more credits needed'
    return `Insufficient funds, please add ${difference} more credits`
  }

  dispenseTreat() {
    console.log('treat!');
  }

  giveChange() {
    console.log('change!');
  }



  reset() {
    this.constructor()
  }
}
