' use strict '

var display = document.getElementById('display')
var cardimage1 = document.getElementById("cardimage1")
var cardimage2 = document.getElementById("cardimage2")
var cardimage3 = document.getElementById("cardimage3")
var cardimage4 = document.getElementById("cardimage4")
var cardimage5 = document.getElementById("cardimage5")

var dcardimage1 = document.getElementById("dcardimage1")
var dcardimage2 = document.getElementById("dcardimage2")
var dcardimage3 = document.getElementById("dcardimage3")
var dcardimage4 = document.getElementById("dcardimage4")
var dcardimage5 = document.getElementById("dcardimage5")

var hitbutton = document.getElementById("hit")
var staybutton = document.getElementById("stay")
var doublebutton = document.getElementById("double")

hitbutton.disabled = true

var globaldeck = []
var pcards = []
var dcards = []
var playeraces
var dealeraces
var phandvalue

function Card(value, rank, suit) {
  if (value > 10) {
    this.value = 10
  } else {
    this.value = value
  }
  this.rank = rank
  this.suit = suit
  this.image = "./images/cards/" + suit + "-" + value + ".png"
}

function createDeck () {
  var deck = []
  this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suits = ['1', '2','3','4'];

  for (var i = 0; i < suits.length; i++){
    for (var j = 0; j < ranks.length; j++) {
      deck.push(new Card(j + 1, ranks[j], suits[i]))
    }
  }

  var lastindex = deck.length - 1
  var swapindex
  var temp
  for (var i = lastindex; i > 0; i--) {
    swapindex = Math.floor(Math.random() * i)
    temp = deck[i]
    deck[i] = deck[swapindex]
    deck[swapindex] = temp
  }

  return deck;

  // var cardString = ""
  // for(var i = 0; i < deck.length; i++) {
  //   cardString += deck[i].rank + deck[i].suit + " "
  // }
  // display.innerHTML = cardString
  // cardimage1.src = deck[0].image
  // cardimage2.src = deck[44].image
}

function starthand () {
  pcards = []
  dcards = []
  playeraces = 0
  dealeraces = 0
  globaldeck = createDeck()
  display.innerHTML = ""
  staybutton.disabled = false

  cardimage3.src = "./images/blank.png"
  cardimage4.src = "./images/blank.png"
  cardimage5.src = "./images/blank.png"

  for (var i = 0; i < 2; i++) {
    tempcard = dealcard()
    pcards.push(tempcard)
    if (i == 0) {
      cardimage1.src = pcards[i].image
    } else {
      cardimage2.src = pcards[i].image
    }
    if (tempcard.value == 1) {
      playeraces++
    }

    tempcard = dealcard()
    dcards.push(tempcard)
    if (i == 0) {
      dcardimage1.src = dcards[i].image
    } else {
      dcardimage2.src = dcards[i].image
    }
    if (tempcard.value == 1) {
      dealeraces++
    }
  }

  //display.innerHTML += "pa: " + playeraces + " da: " + dealeraces
  phandvalue = getHandValue(pcards)
  if (phandvalue != 21) {
    hitbutton.disabled = false
    display.innerHTML += " " + phandvalue
  } else {
    display.innerHTML += "Congratulations you have " + phandvalue
    hitbutton.disabled = true
  }
}

function getHandValue(hand) {
  var value = 0
  var temp

  for (var i = 0; i < hand.length; i++) {
    temp = hand[i].value
    if (temp == 1) {
      value += 11
    } else {
      value += temp
    }
  }

  return value
}

function dealcard () {
  return globaldeck.shift()
}

function hit () {
  var count = pcards.length
  var tempcard = dealcard()
  console.log("count: " + count)
  pcards.push(tempcard)
  if (tempcard.value == 1) playeraces++

  if (count == 2) cardimage3.src = pcards[count].image
  if (count == 3) cardimage4.src = pcards[count].image
  if (count == 4) cardimage5.src = pcards[count].image

  //display.innerHTML += "<br/>" + "pa: " + playeraces
  if (tempcard.value == 1) {
    phandvalue += 11
  } else {
    phandvalue += tempcard.value 
  }
  display.innerHTML += "<br/>" + phandvalue
  if (phandvalue > 21) {
    
    if (playeraces > 0) {
      acecountvalue = playeraces * 10
      phandvalue -= acecountvalue
      playeraces = 0
      display.innerHTML += "<br/>" + phandvalue
    } else {
      display.innerHTML += "<br/>" + "BUST"
      hitbutton.disabled = true
    }

  } else if (phandvalue == 21) {
    display.innerHTML += "<br/>" + "Congratulations you have " + phandvalue
    hitbutton.disabled = true
  }
}

function stay (){
  staybutton.disabled = true
}

function example () {
  var v = 3 + 4
  display.innerHTML = v
}

function combineArrays(arrOne, arrTwo) {
  let arrCombined = []
  for (let i = 0; i < arrOne.length; i++) {
    arrCombined.push(arrOne[i])
    arrCombined.push(arrTwo[i])
  }
  display.innerHTML = arrCombined
}

function getFirstDigit (num) {
  let digitString = ('' + num)[0]
  let digit = parseInt(digitString)
  return digit
}

function compare (numOne, numTwo) {
  const digitOne = getFirstDigit(numOne)
  const digitTwo = getFirstDigit(numTwo)
  if (digitOne < digitTwo) return 1
  if (digitOne > digitTwo) return -1
  else return 0
}

function formLargestNum (arrPosInt) {
  console.log(arrPosInt)
  arrPosInt.sort(compare)
  display.innerHTML += arrPosInt.join('')
}

