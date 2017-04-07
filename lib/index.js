// const VendingMachine = require('./vendingMachine');

const vendingMachine = new VendingMachine();
const bimby = new Person();
let selection = '';
let credit = 0;

const rerenderMachine = () => {
  $('.vending-machine').empty();

  Object.keys(treats).forEach(treat => {
    if(treats[treat].length) {
      displayVendingItems(treat)
    } else {
      displayVendingLocation(treat)
    }
  })
}

const displayVendingItems = (treat) => {
  $('.vending-machine').append(
    `<div class='vending-item'>
      <div>${treats[treat][0].name}</div>
      <div>${treats[treat][0].price}</div>
      <div class='treat-location'>${treat}</div>
    </div>`
  )
}

const displayVendingLocation = (treat) => {
  $('.vending-machine').append(`
    <div class='vending-item'>
      <div>${treat}</div>
    </div>
  `)
}

$('document').ready(() => {
  updateScreen('status', vendingMachine.state.status)
  rerenderMachine()
})

$('.credit-btn').on('click', (e) => {
  credit += parseInt(e.target.id)
  vendingMachine.addCredit(credit);
  updateStatus(vendingMachine.state.status)
  updateScreen('credits', credit)
})

$('.key').on('click', (e) => {
  selection += e.target.innerText
  $('.selection').innerText = '';
  if(selection) {
    updateScreen('selection', selection)
    checkForMatch()
  }
})

$('.treat-dispenser').on('click', '.treat', () => {
  $('.treat-dispenser').empty();
})

$('.change-dispenser').on('click', '.change', () => {
  $('.change-dispenser').empty();
})

$('.return-change-btn').on('click', () => {
  const { credits } = vendingMachine.state
  if(credits)
  giveChange(credits);
  resetMachine();
})

const checkForMatch = () => {
  if(!selection) {
    updateScreen('status', 'please make a selection')
  } else if(selection.length >= 2) {
    handleSelection()
  }
}

const updateScreen = (input, value) => {
  $(`.${input}`).empty();
  $(`.${input}`).append(value)
}

const updateStatus = (status) => {
  updateScreen('status', status)
}

const handleSelection = () => {
  vendingMachine.setSelection(selection)

  if(vendingMachine.state.status === 'out of stock') {
    selection = '';
    updateScreen('status', 'out of stock');
    updateScreen('selection', vendingMachine.state.selection)
  } else if (vendingMachine.state.status === 'vending') {
    dispenseTreat()
  } else {
    errorMessage()
  }
}

const errorMessage = () => {
  updateScreen('status', vendingMachine.state.status)
  selection = ''
  updateScreen('selection', selection)
}

const dispenseTreat = () => {
  updateStatus(vendingMachine.state.status)
  setTimeout(() => {
    $('.treat-dispenser').append(`<span class='treat'>${vendingMachine.state.treat}</span>`);
    rerenderMachine();
    completeTransaction();
  }, 2000)
}

const completeTransaction = () => {
  setTimeout(() => {
    if(vendingMachine.state.change) {
      giveChange(vendingMachine.state.change)
    }
    resetMachine()
  }, 1500)
}

const giveChange = (change) => {
  $('.change-dispenser').append(`<span class='change'>${change}</span>`)
}

const resetMachine = () => {
  vendingMachine.resetState()
  updateScreen('status', vendingMachine.state.status)
  resetVariables()
}

const resetVariables = () => {
  selection = '';
  credit = '';
  updateScreen('credits', vendingMachine.state.credits)
  updateScreen('selection', vendingMachine.state.selection)
}

$('.vending-machine').on('click', () => {
  console.log('Please don\'t knock on the glass!');
})
