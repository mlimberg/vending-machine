require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert
const VendingMachine = require('../lib/vendingMachine').default
const Person = require('../lib/person').default

describe('Vending Machine', function() {
  const vendingMachine = new VendingMachine()
  const bimby = new Person("Alex", 100)

  afterEach(function() {
    vendingMachine.reset();
  });

  it('should accept credits', () => {
    assert.equal(vendingMachine.state.status, 'idle')

    vendingMachine.addCredit(bimby.insertCredits(100))

    assert.equal(vendingMachine.state.status, 'credited')
    assert.equal(vendingMachine.state.credits, 100)
    // assert.equal(vendingMachine.state.change, 0)
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

  it('should prompt an error if there are not enough credits', () => {
    vendingMachine.addCredit(bimby.insertCredits(50))
    assert.equal(vendingMachine.state.credits, 50)
    vendingMachine.setSelection(bimby.makeSelection('A1'))
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

  it('should have an setSelection() method', () => {
    vendingMachine.treats = {
      B5: [{name: 'cheetohs', price: 75}]
    }
    vendingMachine.setSelection('B5')
    assert.equal(vendingMachine.state.selection, 'B5')
  })

  xit('should have an checkCredits() method', () => {

    vendingMachine.checkCredits()
  })

  it('should have an notEnoughCredits() method', () => {
    vendingMachine.notEnoughCredits();
    assert.equal(vendingMachine.state.status, 'more credits needed')
  })

  xit('should have an dispenseTreat() method', () => {

  })

  xit('should have an giveChange() method', () => {

  })

})
