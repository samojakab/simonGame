var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;


var started = false;

$(document).on("keydown", function() {
    
    if(!started) {
        
        $("#level-title").text("Level " + level);
        
        nextSequence();
        
        started = true;
    }

})

$(".btn").on("click", function() {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress();

    checkAnswer(userClickedPattern.length-1);
});


function nextSequence () {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();


}

function playSound(name) {

        var audio = new Audio("sounds/" + name + ".mp3");
        
        audio.play();
    }


function animatePress() {
    $(".btn").on("click", function() {
        
        $(this).addClass("pressed");
        
        setTimeout(function() {
            
            $(".btn").removeClass("pressed");
        }, 100);
    })
}


function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if(userClickedPattern.length === gamePattern.length) {
            
            setTimeout(nextSequence(), 1000);
        }
    } else {
            gameOver();
            startOver();
    }
}



function gameOver() {
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout( function() {
        $("body").removeClass("game-over")
    }, 200);
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}