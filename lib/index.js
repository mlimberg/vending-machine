// const VendingMachine = require('./vendingMachine');

const vendingMachine = new VendingMachine();
const bimby = new Person();
let selection = '';
let credit = 0;

Object.keys(treats).forEach(treat => {
  $('.vending-machine').append(
    `<div class='vending-item'>
      <div >${treats[treat][0].name}</div>
      <div>${treat}</div>
    </div>`
  )
})

const updateStatus = (status) => {
  updateScreen('status', status)
}

$('document').ready(() => {
  updateScreen('status', vendingMachine.state.status)
})

$('.credit-btn').on('click', (e) => {
  credit += parseInt(e.target.id)
  vendingMachine.addCredit(credit);
  updateStatus(vendingMachine.state.status)
  updateScreen('credits', credit)
})

const updateScreen = (input, value) => {
  $(`.${input}`).empty();
  $(`.${input}`).append(value)
}

$('.key').on('click', (e) => {
  selection += e.target.innerText
  $('.selection').innerText = '';
  if(selection) {
    updateScreen('selection', selection)
  }
})

$('.selection-submit').on('click', () => {

  updateStatus(vendingMachine.state.status)
})
