
$('h1').addClass('blue')

Object.keys(treats).forEach(treat => {
  $('.vending-machine').append(
    `<div class='vending-item'>${treats[treat][0].name}</div>`
  )
})
