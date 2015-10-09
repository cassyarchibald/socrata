# Mars Rover Challenge

## Challenge

A squad of rovers are to be landed by NASA on a rectangular plateau on Mars. This plateau must be navigated by the rovers.

A rover's position and location is represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North. 

In order to control a rover, NASA sends a simple string of letters. The possible letters are 'L', 'R' and 'M'. 'L' and 'R' makes the rover spin 90 degrees left or right respectively, without moving from its current spot. 'M' means move forward one grid point, and maintain the same heading.  The square directly North from (x, y) is (x, y + 1). 

The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0, 0. The rest of the input is information pertaining to the rovers that have been deployed. Each rover has two lines of input. The first line gives the rover's position, and the second line is a series of instructions telling the rover how to explore the plateau. 

The position is made up of two integers and a letter separated by spaces, corresponding to the x and y coordinates and the rover's orientation.  Each rover will be finished sequentially, which means that the second rover won't start to move until the first one has finished moving. 

The output for each rover should be its final coordinates and heading. 

Input: 
```
5 5 
1 2 N 
LMLMLMLMM 
3 3 E 
MMRMMRMRRM 
```

Output: 
```
1 3 N 
5 1 E 
```

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

