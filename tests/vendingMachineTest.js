require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert;
const VendingMachine = require('../lib/vendingMachine').default;
const Person = require('../lib/person').default;

describe('Vending Machine', function() {
  const vendingMachine = new VendingMachine();
  const bimby = new Person();

  afterEach(function() {
    vendingMachine.reset();
    bimby.reset();
  });

  it('should accept credits', () => {
    assert.equal(vendingMachine.state.status, 'idle');
    vendingMachine.addCredit(bimby.insertCredits(100));
    assert.equal(vendingMachine.state.status, 'credited');
    assert.equal(vendingMachine.state.credits, 100);
  });

  it('should save selections and credit if 100 credits are added', () => {
    assert.equal(vendingMachine.state.status, 'idle');

    vendingMachine.addCredit(bimby.insertCredits(100));
    vendingMachine.setSelection(bimby.makeSelection('A1'));

    assert.equal(vendingMachine.state.selection, 'A1');
    assert.equal(vendingMachine.state.credits, 100);

  })

  it('should save selections and credit if 50 credits are added', () => {
    assert.equal(vendingMachine.state.status, 'idle');

    vendingMachine.addCredit(bimby.insertCredits(50));
    vendingMachine.setSelection(bimby.makeSelection('A2'));

    assert.equal(vendingMachine.state.selection, 'A2');
    assert.equal(vendingMachine.state.credits, 50);

  })

  it('should set invalid entry status if selection doesn\'t exist', () => {
    assert.equal(vendingMachine.state.status, 'idle');
    vendingMachine.setSelection('Z5');
    assert.equal(vendingMachine.state.status, 'invalid entry');
  })

  it('should prompt an error if there are not enough credits', () => {
    vendingMachine.addCredit(bimby.insertCredits(50));
    assert.equal(vendingMachine.state.credits, 50);
    vendingMachine.setSelection(bimby.makeSelection('A1'));
    assert.equal(vendingMachine.state.status, 'more credits needed');
  })

  it('should return change if there are credits left over', () => {
    bimby.state.credits = 500;
    vendingMachine.addCredit(bimby.insertCredits(100));
    assert.equal(bimby.state.credits, 400);
    vendingMachine.setSelection(bimby.makeSelection('A1'));

    assert.equal(vendingMachine.state.change, 25);
  })

  it('should return an error status if credits do not meet price of the treat selected', () => {
    vendingMachine.addCredit(bimby.insertCredits(50));
    assert.equal(vendingMachine.state.credits, 50);
    vendingMachine.setSelection(bimby.makeSelection('A1'));
    assert.equal(vendingMachine.state.status, 'more credits needed');
  })

  it('should issue change even if remaining value is enough for another treat', () => {
    assert.equal(bimby.state.credits, 500);
    vendingMachine.addCredit(bimby.insertCredits(200));
    assert.equal(vendingMachine.state.credits, 200);
    assert.equal(bimby.state.credits, 300);

    vendingMachine.setSelection(bimby.makeSelection('A1'));
    assert.equal(vendingMachine.state.change, 125);
    bimby.receiveTreat(vendingMachine.dispenseTreat());
    bimby.receiveChange(vendingMachine.giveChange());
    assert.equal(bimby.state.credits, 425);
    assert.equal(vendingMachine.state.change, 0);
    assert.equal(bimby.state.treat, 'Sun Chips');
  })

});





describe('vendingMachine methods', () => {
  const vendingMachine = new VendingMachine()

  afterEach(function() {
    vendingMachine.reset();
  });

  it('should have an addCredit() method', () => {
    vendingMachine.addCredit(100)
    assert.equal(vendingMachine.state.credits, 100)
    assert.equal(vendingMachine.state.status, 'credited')
  })

  it('should have a setSelection() method', () => {
    vendingMachine.treats = {
      B5: [{name: 'cheetohs', price: 75}]
    }
    vendingMachine.setSelection('B5')
    assert.equal(vendingMachine.state.selection, 'B5')
  })

  xit('should have a checkCredits() method', () => {

    vendingMachine.checkCredits()
  })

  it('should have a notEnoughCredits() method', () => {
    vendingMachine.notEnoughCredits();
    assert.equal(vendingMachine.state.status, 'more credits needed')
  })

  xit('should have a dispenseTreat() method', () => {

  })

  it.only('should have a giveChange() method called in handleReset()', () => {
    vendingMachine.state.change = 25;
    vendingMachine.handleReset()

    assert.equal(vendingMachine.state.change, 0);
  })

  it('should have a resetState() method', () => {
    const initialState = vendingMachine.state;
    vendingMachine.state.credits = 100;
    assert.equal(vendingMachine.state.credits, 100);

    vendingMachine.resetState();
    assert.equal(vendingMachine.state.credits, 0);
  })

})


describe('Person methods', () => {
  const bimby = new Person()

  afterEach(() => {
    bimby.reset()
  })


  it('should start with 500 credits', () => {
    assert.equal(bimby.state.credits, 500);
  })

  it('should be able to insert credits', () => {
    assert.equal(bimby.state.credits, 500);
    bimby.insertCredits(100);
    assert.equal(bimby.state.credits, 400);
  })

  it('should be able to make a selection ', () => {
    assert.equal(bimby.state.selection, '');
    bimby.makeSelection('A1');
    assert.equal(bimby.state.selection, 'A1');
  })

  it('should be able to receive change ', () => {
    assert.equal(bimby.state.credits, 500);
    bimby.receiveChange(25);
    assert.equal(bimby.state.credits, 525);
  })

  it('should be able to receive a treat ', () => {
    assert.equal(bimby.state.treat, '');
    bimby.receiveTreat('Snickers');
    assert.equal(bimby.state.treat, 'Snickers');
  })
})
