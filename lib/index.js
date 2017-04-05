// const VendingMachine = require('./vendingMachine');

const vendingMachine = new VendingMachine();
const bimby = new Person();
let selection = '';

Object.keys(treats).forEach(treat => {
  $('.vending-machine').append(
    `<div class='vending-item'>
      <div >${treats[treat][0].name}</div> 
      <div>${treat}</div>
    </div>`
  )
})

$('document').ready(() => {
  updateScreen('status', vendingMachine.state.status)
})

$('.enter-credits-btn').on('click', () => {
  const credits = $('.credit-input').val()
  updateScreen('credits', credits)
  $('.credit-input').val('')
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
