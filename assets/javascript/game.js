$(document).ready(function(){
var selectionType = "player";  //Holds values that drive the idType, classType, and choseClassType
var enemySelected = "false";	//Flag for turning clicking on and off for available enemies
var lastChar; //Defines the players selection of jedi
var player; //Hold index position in array once player has been selected
var enemy; //Holds current index position in array once a new enemy is selected
var idType; //Holds the ID name for player, chosen enemy, or available enemies related elements
var classType; //Holds the class name for player, chosen enemy, or available enemies related elements
var choseClassType; //Hold the class of the parent div for the appended elements to be attached to for player, chosen enemy, or available enemies
var chartersLeft = 4; //Counter for available characters.  I could have used my available enemies array but his was easier as I was exhausted
var availableEnemies = [];  //hold the remaining index values in the characterArray after the player has been selected
var characterArray = [{
	name: "Luke Skywalker",
	healthPoints: 180,
	hitPoints: 25,
	increaseFactor: 1.75,
	image: "assets/images/luke.jfif"
}, {
	name: "Darth Vader",
	healthPoints: 120,
	hitPoints: 15,
	increaseFactor: 1.05,
	image: "assets/images/vader.jfif"
}, {
	name: "Obi-Wan Kenobi",
	healthPoints: 120,
	hitPoints: 15,
	increaseFactor: 1.55,
	image: "assets/images/obi.jfif"
}, {
	name: "Darth Maul",
	healthPoints: 180,
	hitPoints: 25,
	increaseFactor: 1.15,
	image: "assets/images/maul.jfif"
}];  //Array of character objects

//CARDS FUNCTION SECTION
//Called byt the create card function to determine the correct ID to place based on character type.
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

//Called byt the create card function to determine the correct classes to place based on character type.
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

//Called by the frame functions below.
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
	newHP.attr("id", idType + "healthPoints" + i);
	$(newDiv).append(newHP);
}
//FRAME FUNCTIONS SECTION
//Creates the elements for the player frame for all players
function createPlayerFrame() {
	for (var i = 0; i < characterArray.length; i++) {
		createCard(i);
	}
	var newFillDiv = $("<div></div>");
	newFillDiv.addClass("col-md-4")
}

//Creates the elements for the potential enemies frame for all remaining characters
function createPotentialEnemyFrame() {
	for (var i = 0; i < availableEnemies.length; i++) {
		createCard(availableEnemies[i]);
	}
	var newFillDiv = $("<h2></h2>");
	if (chartersLeft < 4) {
		newFillDiv.addClass("col-md-6 extraEnemyH2");
		$(".potentialEnemies").append(newFillDiv);
	}
	else if (chartersLeft < 3) {
		newFillDiv.addClass("col-md-8 extraEnemyH2");
		$(".potentialEnemies").append(newFillDiv);
	}
	else if (chartersLeft < 2) {
		newFillDiv.addClass("col-md-10 extraEnemyH2");
		$(".potentialEnemies").append(newFillDiv);
	}
	if (enemySelected !== "true") {
	choseEnemy();
	}
}

//Creates the elements for the frame for chosen enemy
function createEnemyFrame() {
	createCard(lastChar);
	var newFillDiv = $("<div></div>");
	newFillDiv.addClass("col-md-10 displayResults");
	$(".currentEnemy").append(newFillDiv);
	fightUpdatesFrame();
}

//Creates the frame of elements for the updates section
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

//FILL FUNCTIONS SECTION
//Fills player or enemy cards and is called by the other fill functions
function fillCard(i, name, pic, health) {	
	$(name).text(characterArray[i].name);
	$(pic).attr("src", characterArray[i].image);
	$(health).text(characterArray[i].healthPoints);
}

//Fills all players in the array's player card related elements with IDs in the players to be selected section
function initialFillPlayer() {
	for (var i = 0; i < characterArray.length; i++) {
		var name = "#choseYouName" + i;
		var pic = "#choseYouPic" + i;
		var health = "#choseYouhealthPoints" + i;
		fillCard(i, name, pic, health);
	}
}

//Fills selected player in the array's player card related elements with IDs in the player selected section
function selectedFillPlayer(i) {
		var name = "#choseYouName" + i;
		var pic = "#choseYouPic" + i;
		var health = "#choseYouhealthPoints" + i;
		fillCard(i, name, pic, health);
}

//Fills remaining players in the array's player cards related elements with IDs in the enemy selection section
function potentialFillEnemies() {
	for (var i = 0; i < availableEnemies.length; i++) {
		var name = "#choseThemName" + availableEnemies[i];
		var pic = "#choseThemPic" + availableEnemies[i];
		var health = "#choseThemhealthPoints" + availableEnemies[i];
		fillCard(availableEnemies[i], name, pic, health);
	}
}

//Fills selected enemy in the array's player card related elements with IDs in the enemy selected section
function fillCurrentEnemy(i) {
	var name = "#chosenName" + i;
	var pic = "#chosenPic" + i;
	var health = "#chosenhealthPoints" + i;
	fillCard(i, name, pic, health);
}


//PLAYER FUNCTIONS SECTION
//Waits for user to select player and then launches functions to get ready for the enemy selection
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
	});
}

//ENEMY FUNCTIONS SECTION
//Removes the selected enemiy value from the available enemies array
function removeEnemyFromArray() {
	var y = parseInt(lastChar);
	var z = availableEnemies.indexOf(y);
	availableEnemies.splice(z, 1);
	$(".currentEnemy").empty();
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

//Reloads the potential enemies after an enemy has been selected
function reloadPotentialEnemyList() {
	selectionType = "enemies";
	createPotentialEnemyFrame();
	potentialFillEnemies();
}

//Waits for user to select the enemy and then launches functions to prepare for this and next fight if possible
function choseEnemy() {	
	$(".choseThem").on("click", function(event) {
		$(".choseThem").off("click");
		$(".potentialEnemies").html('');
		lastChar = event.target.id[event.target.id.length -1];
		chartersLeft--;
		selectionType = "chosenEnemy";
		enemySelected = "true";
		removeEnemyFromArray();
		console.log(enemy);
		enemy =  lastChar;
		console.log(enemy);
		createEnemyFrame();
		fillCurrentEnemy(lastChar);
		reloadPotentialEnemyList();
		fight();
	});
}

//FIGHT FUNCTIONS SECTION
//Displays results for player and enemy
function fightUpdates() {
	$("#playerResults").text(characterArray[player].name + " recieves " + characterArray[enemy].hitPoints + " point blow from " + characterArray[enemy].name);
	$("#enemyResults").text(characterArray[enemy].name + " recieves " + characterArray[player].hitPoints + " point blow from " + characterArray[player].name);	
	$("#choseYouhealthPoints" + player).text(characterArray[player].healthPoints);
	$("#chosenhealthPoints" + enemy).text(characterArray[enemy].healthPoints);

}

//Waits for user to click and then calculates battle damage based on player stats.  Also listens for player or enemy to lose
//and executes win or loss procedures
function fight() {
	$(".attackButton").on("click", function(event) {
		//Calculates hit points and remaining life after hits
		characterArray[player].healthPoints = (characterArray[player].healthPoints - characterArray[enemy].hitPoints).toFixed();
		characterArray[enemy].healthPoints = (characterArray[enemy].healthPoints - characterArray[player].hitPoints).toFixed();
		characterArray[player].hitPoints = (characterArray[player].increaseFactor * characterArray[player].hitPoints).toFixed();
		fightUpdates();
		
		//Announces player loss and reloads game
		if (characterArray[player].healthPoints <= 0) {
			$("#playerResults").text(characterArray[player].name + " LOSES!!!  OOOOOOOH NOOOO!!!");
			$("#enemyResults").text("");
			$(".attackButton").off("click");
			alert("Game is ready to start again!!")
			reloadGame();			
		}

		//Announces player wins and gets ready for new game or next player
		else if (characterArray[enemy].healthPoints <= 0) {
			$("#playerResults").text(characterArray[player].name + " WINS!!!");
			$("#enemyResults").text("");
			$(".attackButton").off("click");
			enemySelected = "false";
			choseEnemy();
			$(".extraEnemyH2").text("Click on a new enemy!");
			if (chartersLeft === 0) {
				reloadGame();
			}
			//ADD FEATURE FOR CLICING BUTTON WHEN NO FIGHT IS GOING INSTRUCTING THE USER WHAT TO DO NEXT
			//ALSO NEED TO FILL THE #playerResults WITH INSTRUCTION ON WHAT TO DO NEXT AND TO CLEAR THE LOSING PLAYER
		}
	});
}

//SECONDARY AND BEYOND GAME START
function reloadGame() {
	//Resets varialbes
	selectionType = "player";
	enemySelected = "false";
	lastChar = ""; //Defines the players selection of jedi
	player = "";
	enemy = "";
	idType = "";
	classType = "";
	choseClassType = "";
	chartersLeft = 4;
	availableEnemies = [];
	characterArray[0].healthPoints = 180;
	characterArray[0].hitPoints = 25;
	characterArray[1].healthPoints = 120;
	characterArray[1].hitPoints = 15;
	characterArray[2].healthPoints = 120;
	characterArray[2].hitPoints = 15;
	characterArray[3].healthPoints = 180;
	characterArray[3].hitPoints = 25;
	//Restarts the game
	$(".currentEnemy").empty();
	$(".potentialEnemies").empty();
	$(".player").empty();
	createPlayerFrame();
	initialFillPlayer();
	chosePlayer();
}

//INITIAL GAME START
createPlayerFrame();
initialFillPlayer();
chosePlayer();


});