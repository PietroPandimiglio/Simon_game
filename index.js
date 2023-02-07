var buttonColours = ["red", "blue", "green", "yellow"]  //array used to pick a color
var gamePattern = []  //array that store the random color picked
var userClickedPattern = []  //array that store the clicked pattern
var level = 0  //level of the game
var patternCount = 0  //index to
var interval = setInterval(function() {  //create an interval of blinking
  blink($(".caption"), 400)
}, 800)
$(".lose").fadeOut()
var width = $(window).width();  //width of the screen
var height = $(window).height();  //height of the screen

//check if the user is using a pc or a smartphone
/*$(document).on("keydown", function() {
    $(".caption").text("Level " + level)
    blink($(".caption"), 200)
    blink($(".caption"), 200)
    setTimeout(nextSequence, 1000)
  })*/

if ((width >= 1024) && (height >= 768)) {
  $(document).on("keydown", function() {
    $(".caption").text("Level " + level)
    blink($(".caption"), 200)
    blink($(".caption"), 200)
    setTimeout(nextSequence, 1000)
  })
} else {
  $(".caption").text("Tap on the screen to start.")
  $(document).on("click", function() {
    $(".caption").text("Level " + level)
    setTimeout(nextSequence, 1000)
  })
}

//initialization function
function start() {
  $(".lose").fadeIn()
  $(".score").text("Score: " + level)
  $(".score").fadeIn()
  if ((width >= 1024) && (height >= 768)) {
    $(".caption").text("Press any key to start.")
  } else {
    $(".caption").text("Tap on the screen to start.")
  }
  interval = setInterval(function() {
    blink($(".caption"), 400)
  }, 800)
  gamePattern = []
  userClickedPattern = []
  patternCount = 0
  level = 0
  checkStart(level)
}

//Check if the game has just started or not
function checkStart(level) {
  if (level === 0) {
    $(document).on("keydown", function(){
      $(".caption").text("Level " + level)
      setTimeout(nextSequence, 1500)
    })
    $(document).on("click", function(){
      $(".caption").text("Level " + level)
      setTimeout(nextSequence, 1500)
    })
  } else if (level > 0) {
    $(document).unbind("keydown")
    $(document).unbind("click")
  }
}

//manage the event when user click on a button
$(".tasto").on("click", function() {
  var userChosenColor = trovaClasse($(this))
  userClickedPattern.push(userChosenColor)
  playSound(userChosenColor)
  animatedPress($(this))
  if (gamePattern.length != 0) {
    if (checkAnswer(userChosenColor, patternCount)) {
      patternCount++
      if (patternCount === gamePattern.length) {
        patternCount = 0
        $(".caption").text("Level " + level)
        blink($(".caption"), 200)
        blink($(".caption"), 200)
        setTimeout(nextSequence, 1000)
      }
    }
  }
})

//manage the turn of the game
function nextSequence() {
  $(".lose").fadeOut()
  $(".score").fadeOut()
  $(".caption").text("Level " + level)
  clearInterval(interval)
  var randomNumber = (Math.floor(Math.random() * 4))
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  var tasto = tastoSequenza(randomChosenColour)
  blink(tasto, 100)
  playSound(randomChosenColour)
  level++
  checkStart(level)
}

//return the clicked button's class using the "color"
function tastoSequenza(randomChosenColour) {
  var tasto
  switch (randomChosenColour) {
    case "red":
      tasto = ".red"
      break;
    case "green":
      tasto = ".green"
      break;
    case "yellow":
      tasto = ".yellow"
      break;
    case "blue":
      tasto = ".blue"
      break;
  }
  return tasto
}

//manage the blinking of elements
function blink(elemento, tempo) {
  $(elemento).fadeOut(tempo);
  $(elemento).fadeIn(tempo);
}

//return the button's class using the element
function trovaClasse(tasto) {
  if (tasto.hasClass("red")) {
    return "red"
  } else if (tasto.hasClass("green")) {
    return "green"
  } else if (tasto.hasClass("blue")) {
    return "blue"
  } else if (tasto.hasClass("yellow")) {
    return "yellow"
  }
}

//play the button's sound
function playSound(nome) {
  switch (nome) {
    case "red":
      var suono = new Audio("suoni/red.mp3")
      suono.play()
      break;
    case "green":
      var suono = new Audio("suoni/green.mp3")
      suono.play()
      break;
    case "yellow":
      var suono = new Audio("suoni/yellow.mp3")
      suono.play()
      break;
    case "blue":
      var suono = new Audio("suoni/blue.mp3")
      suono.play()
      break;
  }
}

//animate a button press
function animatedPress(tasto) {
  tasto.addClass("pressed")
  setTimeout(function() {
    tasto.removeClass("pressed")
  }, 100)
}

//check if the button chosen by the user is correct. If not, restart the game.
function checkAnswer(currenLevel, count) {
  if (currenLevel === gamePattern[count]) {
    return true
  } else {
    var wrong = new Audio("suoni/wrong.mp3")
    wrong.play()
    start()
  }
}
