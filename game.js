var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"]
var randomNumber;
var userClickedPattern=[];
$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
var level=0;
var started=false;
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    

}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour){
    $('#'+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed"); 
    },100);
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over"); 
        },200);
        $("#level-title").text("Game over, Press Any Key to Restart");
        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
