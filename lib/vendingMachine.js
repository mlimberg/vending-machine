
class VendingMachine {
  constructor(treatInput) {
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
    if(Object.keys(this.treats).includes(selection)) {
      if(this.treats[selection].length === 0) {
        this.state.selection = '';
        return this.state.status = 'out of stock';
      }

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

const treats = {
  A1: [{name: 'Sun Chips', price: 75}, {name: 'Sun Chips', price: 75}, {name: 'Sun Chips', price: 75}, {name: 'Sun Chips', price: 75}, {name: 'Sun Chips', price: 75}],
  A2: [{name: 'Doritos', price: 75}, {name: 'Doritos', price: 75}, {name: 'Doritos', price: 75}, {name: 'Doritos', price: 75}, {name: 'Doritos', price: 75}],
  A3:[{name: 'Beef Jerky', price: 75}, {name: 'Beef Jerky', price: 75}, {name: 'Beef Jerky', price: 75}, {name: 'Beef Jerky', price: 75}, {name: 'Beef Jerky', price: 75}],
  A4: [{name: 'Cheetohs', price: 75}, {name: 'Cheetohs', price: 75}, {name: 'Cheetohs', price: 75}, {name: 'Cheetohs', price: 75}, {name: 'Cheetohs', price: 75}],
  B1: [{name: 'Gardettos', price: 75}, {name: 'Gardettos', price: 75}, {name: 'Gardettos', price: 75}, {name: 'Gardettos', price: 75}, {name: 'Gardettos', price: 75}],
  B2: [{name: 'Snickers', price: 75}, {name: 'Snickers', price: 75}, {name: 'Snickers', price: 75}, {name: 'Snickers', price: 75}, {name: 'Snickers', price: 75}],
  B3: [{name: 'Twix', price: 75}, {name: 'Twix', price: 75}, {name: 'Twix', price: 75}, {name: 'Twix', price: 75}, {name: 'Twix', price: 75}],
  B4: [{name: 'M&Ms', price: 75}, {name: 'M&Ms', price: 75}, {name: 'M&Ms', price: 75}, {name: 'M&Ms', price: 75}, {name: 'M&Ms', price: 75}],
  C1: [{name: '100 Grand', price: 75}, {name: '100 Grand', price: 75}, {name: '100 Grand', price: 75}, {name: '100 Grand', price: 75}, {name: '100 Grand', price: 75}],
  C2: [{name: 'Butterfinger', price: 75}, {name: 'Butterfinger', price: 75}, {name: 'Butterfinger', price: 75}, {name: 'Butterfinger', price: 75}, {name: 'Butterfinger', price: 75}],
  C3: [{name: 'Kit-Kat', price: 75}, {name: 'Kit-Kat', price: 75}, {name: 'Kit-Kat', price: 75}, {name: 'Kit-Kat', price: 75}, {name: 'Kit-Kat', price: 75}],
  C4: [{name: 'Reeses', price: 75}, {name: 'Reeses', price: 75}, {name: 'Reeses', price: 75}, {name: 'Reeses', price: 75}, {name: 'Reeses', price: 75}],
  D1: [{name: 'Skittles', price: 75}, {name: 'Skittles', price: 75}, {name: 'Skittles', price: 75}, {name: 'Skittles', price: 75}, {name: 'Skittles', price: 75}],
  D2: [{name: 'Babe Ruth', price: 75}, {name: 'Babe Ruth', price: 75}, {name: 'Babe Ruth', price: 75}, {name: 'Babe Ruth', price: 75}, {name: 'Babe Ruth', price: 75}],
  D3: [{name: 'Hersheys', price: 75}, {name: 'Hersheys', price: 75}, {name: 'Hersheys', price: 75}, {name: 'Hersheys', price: 75}, {name: 'Hersheys', price: 75}],
  D4: [{name: 'Oh Henry', price: 75}],
}


if(typeof module !== 'undefined') {
  module.exports.default = VendingMachine
}
