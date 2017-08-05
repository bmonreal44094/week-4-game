$(document).ready(function(){

var wins = 0;
var losses = 0;
var randomNumber = 0;
var score = 0;
var gemValues = [];
var gemClickValue = 0;
var timesRun = 0;

//Generates random number to be achieved by player
function randomNumberGen () {
	randomNumber = Math.floor(Math.random() * (100)) + 19;
}

//Generates 4 random numbers between 1 and 12 to be place in the gemValues array
function gemValueGen () {
	for (var i = 0; i < 4; i++) {
		var gemRandomNumber = Math.floor(Math.random() * (12));
		gemValues.push(gemRandomNumber);
	}
}

//Initial set of random number and gem values
if (timesRun <= 0) {
	reset();
}

//Associates the value of each gem to the image on the screen
$("#redGem").data("value", gemValues[0]);
$("#blueGem").data("value", gemValues[1]);
$("#yellowGem").data("value", gemValues[2]);
$("#greenGem").data("value", gemValues[3]);

//Waits for a click on one of the gems and then adds its value
//to the score while refreshing it on the screen and looking for
//winnning or losing conditions
$(".gemImages").on("click", function() {
	gemClickValue = $(this).data("value");
	score = gemClickValue + score;
	$("#score").text(score);
	if (score > randomNumber) {
		youLose();
	}
	else if (score === randomNumber) {
		youWin();
	}

});

//Resets everything for a new game
function reset() {
	randomNumberGen();
	gemValueGen();
	score = 0;
	refresh();
}

//Executed if the users score eceeds the random number
function youLose () {
	losses++;
	timesRun++
	reset();
	refresh();
}

//Executed if the users score equels the random number
//and increments the wins and times run along with calling the
//reset and refresh functions
function youWin () {
	wins++;
	timesRun++
	reset();
	refresh();
}

//Refreshes the values on the screen as the game is played or
//if there is an event
function refresh() {
	$("#randomNumber").text(randomNumber);
	$("#score").text(score);
	$("#wins").text("Wins: " + wins);
	$("#losses").text("Losses: " + losses);
	//Below is for error checking or cheating, your call
	//console.log("wins: " + wins);
	//console.log("losses: " + losses);
	//console.log("random number: " + randomNumber);
	//console.log("score: " + score);
	//console.log("gem values" + gemValues);
}

});