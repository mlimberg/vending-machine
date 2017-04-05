const vendingMachine = new VendingMachine();
const bimby = new Person();
let selection = '';

Object.keys(treats).forEach(treat => {
  $('.vending-machine').append(
    `<div class='vending-item'>${treats[treat][0].name}</div>`
  )
})

$('.enter-credits-btn').on('click', () => {
  const credits = $('.credit-input').val()
  updateScreen('credits', credits)
  $('.credit-input').val('')
})

const updateScreen = (input, value) => {
  let content
  switch(input) {
    case 'credits':
      content = `Credits: ${value}`;
      break;
    case 'selection':
      content = `Selection: ${value}`;
      break;
    case 'status':
      content = `Status: ${value}`
      break;
    default:
      return;
  }

  $(`.${input}`).append(content)
}

$('.key').on('click', (e) => {
  selection += e.target.innerText
  $('.selection').innerText = '';
  if(selection) {
    updateScreen('selection', selection)
  }
})
