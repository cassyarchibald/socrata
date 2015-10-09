# Mars Rover Challenge

## Challenge



## Setup

1. Open the .zip file and `$ cd rover`.

2. Run `$ npm install` to install the node dependencies.

3. Run `$ node src/runner.js` to quickly run through the given test data.

## Tests

`$ npm test`

## Brief Overview

#### squad.js

A `Squad` is a set of rovers.  NASA sends a command string to a squad, which then relays commands one at a time to each of its rovers.  Thus, squads act as central command units (parsing commands, landing on planets, keeping track of rovers, etc.).

#### rover.js

Each `Rover` represents a single Mars Rover.  Rovers have a **position** (a tuple of x, y coordinates) and an **orientation** (North/South/East/West).  Rovers can advance, turn, explore, report their status, and have basic getters/setters.

#### plateau.js

A `Plateau` represents the map that the squad has landed on.  Plateaus have only two attributes, an **xDimension** and a **yDimension** that specify their size.

#### position.js

A `Position` functions almost identically to a (x-coor, y-coor) tuple and provides basic getters/setters.

#### orientation.js

I wanted to try to avoid using massive switch/case and if/else statements to determine how a rover should move given a certain position and orientation.  Thus, I defined an object called **Orientation** that can be used to easily determine how a rover should move and turn.

