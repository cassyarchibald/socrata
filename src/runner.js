var Plateau = require('./plateau'),
  Rover = require('./rover'),
  Squad = require('./squad');

// The NASA command to test with.
var nasaCommands = '5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM';

// Create two rovers and a squad.
var redRover = new Rover();
var blueRover = new Rover();
var squad = new Squad();

// Add the rovers to the squad.
squad.addRovers([redRover, blueRover]);

// Create the mars plateau and land the squad on the plateau.
var marsPlateau = new Plateau();

squad.landOn(marsPlateau);

// The squad will now parse nasa's commands.
console.log(squad.executesCommands(nasaCommands));
