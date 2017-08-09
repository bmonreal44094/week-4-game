$(document).ready(function(){
var selectionType = "player";
var enemySelected = "false";
var lastChar; //Defines the players selection of jedi
var player;
var enemy;
var idType;
var classType;
var choseClassType;
var chartersLeft = 4;
var availableEnemies = [];
var characterArray = [{
	name: "Luke Skywalker",
	HealthPoints: 180,
	HitPoints: 25,
	increaseFactor: 1.75,
	image: "assets/images/luke.jfif"
}, {
	name: "Darth Vader",
	HealthPoints: 120,
	HitPoints: 15,
	increaseFactor: 1.05,
	image: "assets/images/vader.jfif"
}, {
	name: "Obi-Wan Kenobi",
	HealthPoints: 120,
	HitPoints: 15,
	increaseFactor: 1.55,
	image: "assets/images/obi.jfif"
}, {
	name: "Darth Maul",
	HealthPoints: 180,
	HitPoints: 25,
	increaseFactor: 1.15,
	image: "assets/images/maul.jfif"
}];

function playerOrEnemyID() {
	
	if (selectionType === "player") {
		idType = "choseYou";
	}

	else if (selectionType === "enemies") {
		idType = "choseThem";
	}

	else if (selectionType === "chosenEnemy") {
		idType = "chosen";
	}
}

function playerOrEnemyType() {

	if (selectionType === "player") {
		classType = ".player";
		choseClassType = "choseYou";
	}

	else if (selectionType === "enemies") {
		classType = ".potentialEnemies";
		choseClassType = "choseThem";
	}

	else if (selectionType === "chosenEnemy") {
		classType = ".currentEnemy";
		choseClassType = "chosen";
	}
}

function createCard(i) {
	
	//Picks the correct idType, classType, and choseClassType
	//based on the currect selectionType
	playerOrEnemyID();
	playerOrEnemyType();

	//Creates the div holding the player or enemy cards
	var newDiv = $("<div></div>");
	newDiv.addClass("jediCard col-md-2 " + choseClassType);
	newDiv.attr("id", idType + i);
	$(classType).append(newDiv);		
	
	//Creates the p tag for name
	var newName = $("<p></p>");
	newName.attr("id", idType + "Name" + i);
	$(newDiv).append(newName);

	//Creates the img tag for pic
	var newImg = $("<img>");
	newImg.addClass("jediImages");
	newImg.attr("id", idType + "Pic" + i);
	$(newDiv).append(newImg);

	//Creates the p tag for health points
	var newHP = $("<p></p>");
	newHP.attr("id", idType + "HealthPoints" + i);
	$(newDiv).append(newHP);
}

function createPlayerFrame() {
	for (var i = 0; i < characterArray.length; i++) {
		createCard(i);
	}
	var newFillDiv = $("<div></div>");
	newFillDiv.addClass("col-md-4")
}

function createPotentialEnemyFrame() {
	for (var i = 0; i < availableEnemies.length; i++) {
		createCard(availableEnemies[i]);
	}
	var newFillDiv = $("<div></div>");
	if (availableEnemies < 3) {
		newFillDiv.addClass("col-md-2");
	}
	else if (availableEnemies <2) {
		newFillDiv.addClass("col-md-4");
	}
	if (enemySelected !== "true") {
	choseEnemy();
	}
}

function createEnemyFrame() {
	createCard(lastChar);
	var newFillDiv = $("<div></div>");
	newFillDiv.addClass("col-md-10 displayResults");
	$(".currentEnemy").append(newFillDiv);
	fightUpdatesFrame();
}

//Fills player or enemy cards.
function fillCard(i, name, pic, health) {	
	$(name).text(characterArray[i].name);
	$(pic).attr("src", characterArray[i].image);
	$(health).text(characterArray[i].HealthPoints);
}

function fillCurrentEnemy(i) {
	var name = "#chosenName" + i;
	var pic = "#chosenPic" + i;
	var health = "#chosenHealthPoints" + i;
	fillCard(i, name, pic, health);
	removeEnemyFromArray();
}

function initialFillPlayer() {
	for (var i = 0; i < characterArray.length; i++) {
		var name = "#choseYouName" + i;
		var pic = "#choseYouPic" + i;
		var health = "#choseYouHealthPoints" + i;
		fillCard(i, name, pic, health);
	}
}

function selectedFillPlayer(i) {
		var name = "#choseYouName" + i;
		var pic = "#choseYouPic" + i;
		var health = "#choseYouHealthPoints" + i;
		fillCard(i, name, pic, health);
}

function potentialFillEnemies() {
	for (var i = 0; i < availableEnemies.length; i++) {
		var name = "#choseThemName" + availableEnemies[i];
		var pic = "#choseThemPic" + availableEnemies[i];
		var health = "#choseThemHealthPoints" + availableEnemies[i];
		fillCard(availableEnemies[i], name, pic, health);
	}
}

function removeEnemyFromArray() {
	//console.log(availableEnemies);
	//console.log(lastChar);
	var y = parseInt(lastChar);
	//console.log(y);
	var z = availableEnemies.indexOf(y);
	//console.log(z);
	availableEnemies.splice(z, 1);
	//console.log(availableEnemies);
}


function choseEnemy() {	
	$(".choseThem").on("click", function(event) {
		$(".choseThem").off("click");
		$(".potentialEnemies").html('');
		lastChar = event.target.id[event.target.id.length -1];
		chartersLeft--;
		selectionType = "chosenEnemy";
		enemySelected = "true";
		enemy =  lastChar;
		createEnemyFrame();
		fillCurrentEnemy(lastChar);
		reloadPotentialEnemyList();
	});
}

function fightUpdatesFrame() {
		//Creates the p tag for player results
		var newName = $("<p></p>");
		newName.attr("id", "playerResults");
		$(".displayResults").append(newName);
		
		//Creates the p tag for enemy results
		var newName = $("<p></p>");
		newName.attr("id", "enemyResults");
		$(".displayResults").append(newName);
}

//Displays results for player and enemy
function fightUpdates() {
	$("#playerResults").text(characterArray[player].name + " recieves " + characterArray[enemy].HitPoints + " point blow from " + characterArray[enemy].name);
	$("#enemyResults").text(characterArray[enemy].name + " recieves " + characterArray[player].HitPoints + " point blow from " + characterArray[player].name);	
	$("#choseYouHealthPoints" + player).text(characterArray[player].HealthPoints);
	$("#chosenHealthPoints" + enemy).text(characterArray[enemy].HealthPoints);

}

function fight() {
	$(".attackButton").on("click", function(event) {
		//Calculates hit points and remaining life after hits
		characterArray[player].HealthPoints = (characterArray[player].HealthPoints - characterArray[enemy].HitPoints).toFixed();
		characterArray[enemy].HealthPoints = (characterArray[enemy].HealthPoints - characterArray[player].HitPoints).toFixed();
		characterArray[player].HitPoints = (characterArray[player].increaseFactor * characterArray[player].HitPoints).toFixed();
		fightUpdates();
		

		if (characterArray[player].HealthPoints <= 0) {
			$("#playerResults").text(characterArray[player].name + " LOSES!!!  OOOOOOOH NOOOO!!!");
			$("#enemyResults").text("");
			$(".attackButton").off("click");			
		}
		else if (characterArray[enemy].HealthPoints <= 0) {
			$("#playerResults").text(characterArray[player].name + " WINS!!!");
			$("#enemyResults").text("");
			$(".attackButton").off("click");
			enemySelected = "false";
			//ADD FEATURE FOR CLICING BUTTON WHEN NO FIGHT IS GOING INSTRUCTING THE USER WHAT TO DO NEXT
			//ALSO NEED TO FILL THE #playerResults WITH INSTRUCTION ON WHAT TO DO NEXT AND TO CLEAR THE LOSING PLAYER
		}
	});
}

//STILL NEEDS TO BE COMPLETED
function reloadPotentialEnemyList() {
	selectionType = "enemies";
	createPotentialEnemyFrame();
	potentialFillEnemies();
	//createCard(lastChar);
	//selectedFillPlayer(lastChar);

}

function chosePlayer() {	
	$(".choseYou").on("click", function(event) {
		$(".player").html('');
		$(".choseYou").off("click");
		lastChar = event.target.id[event.target.id.length -1];
		createCard(lastChar);
		selectedFillPlayer(lastChar);
		selectionType = "enemies";
		player = lastChar;
		loadInitialPotentialEnemyList();
		fight();	
	});
}

function loadInitialPotentialEnemyList() {
	for (var i = 0; i < characterArray.length; i++) {
			if (lastChar != i) {
				availableEnemies.push(i);
			}
		}
		chartersLeft = 3;
		createPotentialEnemyFrame();
		potentialFillEnemies();	
}

createPlayerFrame();
initialFillPlayer();
chosePlayer();


});