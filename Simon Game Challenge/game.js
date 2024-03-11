
var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern = [];

var started = false;

var level=0;

$(document).keydown(function() {
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
function checkAnswer(currentLevel){

}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
});

function newSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function animatePress(currentColour){
    var pressedButton= $("#"+ currentColour);
    pressedButton.addClass("pressed");
    setTimeout(function(){
        pressedButton.removeClass("pressed");
    },100)
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
            audio.play();
}