'use strict';
var jsonFile = require('fs')
var item;
var subItem;
var classmem;
var player;
var input = process.stdin;
input.setEncoding('utf-8');
var playerSorted;
var playerData;

console.log("Please input team ID to get all player details in command line.");
var count=0;
input.on('data', function (data) {
	count++;
    if(data.toString().trim() === 'exit'){
		process.on('exit', function(data) {
			return console.log(`About to exit with code ${data}`);
		});
        console.log("User input complete, program exit.");
        process.exit();
    }else{
		let teamID = "";
		teamID = Number(data);
		let playerData = [];
		playerData = getPlayerData(teamID);
		if(count==1) {
			console.log("Do you want to see top five batsman?");		
		}
		if(data.toString().trim() === 'yes' || data.toString().trim() === 'y'){
			let topFivePlayers = [];
			topFivePlayers = getTopFivePlayers();
			console.log(playerSorted);
			console.log();
		} else{
			if(data.toString().trim() === 'n' || data.toString().trim() === 'no'){
				console.log("User input complete, program exit.");
				process.exit();
			}
		}			
	}
});

function getPlayerData(teamID) {
	classmem = JSON.parse(jsonFile.readFileSync("bat.json", "utf8"));
	player = classmem['bat-rank']['rank'];
	let person = 'Moeen Ali';
	let matches = "";
	let buf1, buf2, x;
	for (item in player) {		
		if(player[item]['team_id'] == teamID) {
			playerData = player[item];
			console.log(playerData);
			console.log();	
		} else {
			continue;
		}
	}
}

function getTopFivePlayers() {
	let sortedPlayers = [];
	sortedPlayers = player.sort(function(a,b) {
		return b.Points - a.Points;
	});
	playerSorted = player.splice(0, 5, player);
	return playerSorted;
}

