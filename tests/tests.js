var Plateau = require('./plateau'),
  Rover = require('./rover'),
  Squad = require('./squad'),
  Position = require('./position');

var chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;

describe('Rover', function () {
  describe('#constructor', function () {

    var rover;

    it('should initialize a new rover', function () {
      rover = new Rover();
      assert.deepEqual(rover.getPosition(), new Position(0, 0));
      assert.equal(rover.getOrientation(), 'N');
    });

    it('should initialize a new rover with values', function () {
      rover = new Rover(1, 2, 'S');
      assert.deepEqual(rover.getPosition(), new Position(1, 2));
      assert.equal(rover.getOrientation(), 'S');
    });
  });

  describe('#getPosition', function () {

    it('should get position', function () {
      var rover = new Rover(1, 2, 'E');
      assert.deepEqual(rover.getPosition(), new Position(1, 2));
    });

  });

  describe('#getOrientation', function () {

    it('should get orientation', function () {
      var rover = new Rover(1, 2, 'E');
      assert.equal(rover.getOrientation(), 'E');
    });

  });

  describe('#setup', function () {

    it('should setup the rover', function () {
      var rover = new Rover();
      rover.setup(1, 2, 'N');
      assert.deepEqual(rover.getPosition(), new Position(1, 2));
      assert.equal(rover.getOrientation(), 'N');
    });

  });

  describe('#advance', function () {

    var rover;

    beforeEach('create a new rover', function () {
      rover = new Rover();
    });

    it('should advance the rover west once', function () {
      rover.setup(2, 2, 'W');
      rover.advance();
      assert.deepEqual(rover.getPosition(), new Position(1, 2));
      assert.equal(rover.getOrientation(), 'W');
    });

    it('should advance the rover west twice', function () {
      rover.setup(2, 2, 'W');
      rover.advance();
      rover.advance();
      assert.deepEqual(rover.getPosition(), new Position(0, 2));
      assert.equal(rover.getOrientation(), 'W');
    });

    it('should advance the rover north once', function () {
      rover.setup(2, 2, 'N');
      rover.advance();
      assert.deepEqual(rover.getPosition(), new Position(2, 3));
      assert.equal(rover.getOrientation(), 'N');
    });

    it('should advance the rover south once', function () {
      rover.setup(2, 2, 'S');
      rover.advance();
      assert.deepEqual(rover.getPosition(), new Position(2, 1));
      assert.equal(rover.getOrientation(), 'S');
    });

    it('should advance the rover east once', function () {
      rover.setup(2, 2, 'E');
      rover.advance();
      assert.deepEqual(rover.getPosition(), new Position(3, 2));
      assert.equal(rover.getOrientation(), 'E');
    });

  });

  describe('#turn', function () {

    var rover,
      position;

    beforeEach('create a new rover', function () {
      rover = new Rover(3, 3,'W');
      position = new Position(3, 3);
    });

    it('should turn the rover left', function () {
      rover.turn('L');
      assert.deepEqual(rover.getPosition(), position);
      assert.equal(rover.getOrientation(), 'S');
    });

    it('should turn the rover right', function () {
      rover.turn('R');
      assert.deepEqual(rover.getPosition(), position);
      assert.equal(rover.getOrientation(), 'N');
    });

    it('should turn the rover left then right', function () {
      rover.turn('L');
      rover.turn('R');
      assert.deepEqual(rover.getPosition(), position);
      assert.equal(rover.getOrientation(), 'W');
    });

    it('should turn the rover in a circle', function () {
      rover.turn('L');
      rover.turn('L');
      rover.turn('L');
      rover.turn('L');
      assert.deepEqual(rover.getPosition(), position);
      assert.equal(rover.getOrientation(), 'W');
    });

  });

  describe('#explore', function () {

    var rover;

    beforeEach('create a new rover', function () {
      rover = new Rover(3, 3, 'N');
    });

    it('should do nothing', function () {
      rover.explore('');
      assert.equal(rover.status(), '3 3 N');
    });

    it('should explore in a circle', function () {
      rover.explore('LLLL');
      assert.equal(rover.status(), '3 3 N');
    });

    it('should explore back and forth', function () {
      rover.explore('LRLR');
      assert.equal(rover.status(), '3 3 N');
    });

    it('should explore in sequence 1', function () {
      rover.explore('LMR');
      assert.equal(rover.status(), '2 3 N');
    });

    it('should explore in sequence 2', function () {
      rover.explore('MMMRRM');
      assert.equal(rover.status(), '3 5 S');
    });

  });

  describe('#status', function () {

    it('should report the rover\'s status', function () {
      var rover = new Rover();
      rover.setup(1, 2, 'N');
      assert.equal(rover.status(), '1 2 N');
    });

  });


});

describe('Squad', function () {

  describe('#constructor', function () {

    it('should create a new squad with no rovers', function () {
      var squad = new Squad();
      assert.deepEqual(squad.getRovers(), []);
    });

    it('should create a new squad with a rover', function () {
      var squad = new Squad([ new Rover() ]);
      assert.deepEqual(squad.getRovers(), [ new Rover() ]);
    });

    it('should create a new squad with multiple rovers', function () {
      var roverA = new Rover(),
        roverB = new Rover(),
        squad = new Squad([ roverA, roverB ]);
      assert.deepEqual(squad.getRovers(), [ roverA, roverB ]);
    });

  });

  describe('#getRovers', function () {

    // This was  tested in the constructor

  });

  describe('#addRovers', function () {

    it('should add rovers to an empty squad', function () {
      var roverA = new Rover(),
        roverB = new Rover(),
        squad = new Squad();
      squad.addRovers([ roverA, roverB ]);
      assert.deepEqual(squad.getRovers(), [ roverA, roverB ]);
    });

    it('should add rovers to a non-empty squad', function () {
      var roverA = new Rover(),
        roverB = new Rover(),
        roverC = new Rover(),
        squad = new Squad([ roverC ]);
      squad.addRovers([ roverA, roverB ]);
      assert.deepEqual(squad.getRovers(), [ roverC, roverA, roverB ]);
    });

  });

  describe('#landOn', function () {

    it('should properly land on a plateau', function () {
      var squad = new Squad();
      squad.landOn(new Plateau());
      assert.deepEqual(squad._plateau, new Plateau());
    });

  });

  describe('#executesCommands', function () {

    var roverA,
      roverB,
      roverC,
      squad,
      plateau;

    var basicCommand1 = '3 3\n0 0 N\nLLL',
      basicCommand2 = '3 3\n0 0 N\nM',
      basicCommand3 = '4 4\n0 1 S\nMLRLMM';

    var nasaCommands =
      '5 5\n' +
      '1 2 N\n' +
      'LMLMLMLMM\n' +
      '3 3 E\n' +
      'MMRMMRMRRM\n';

    beforeEach('create a squad of rovers and properly land them', function () {
      roverA = new Rover();
      roverB = new Rover();
      roverC = new Rover();
      squad = new Squad();
      plateau = new Plateau();
    });

    it('should handle a basic command 1', function () {
      squad.addRovers([ roverA ]);
      squad.landOn(plateau);
      assert.deepEqual(squad.executesCommands(basicCommand1), '0 0 E\n');
    });

    it('should handle a basic command 2', function () {
      squad.addRovers([ roverA ]);
      squad.landOn(plateau);
      assert.deepEqual(squad.executesCommands(basicCommand2), '0 1 N\n');
    });

    it('should handle a basic command 3', function () {
      squad.addRovers([ roverA ]);
      squad.landOn(plateau);
      assert.deepEqual(squad.executesCommands(basicCommand3), '2 0 E\n');
    });

    it('should handle the test command from NASA', function () {
      squad.addRovers([ roverA, roverB ]);
      squad.landOn(plateau);
      assert.deepEqual(squad.executesCommands(nasaCommands), '1 3 N\n5 1 E\n');
    });

  });

});

describe('Position', function () {

  describe('#constructor', function () {

    it('should create a new position with no parameters', function () {
      var position = new Position();
      assert.equal(position.getX(), 0);
      assert.equal(position.getY(), 0);
    });

    it('should create a new position with parameters', function () {
      var position = new Position(1, 1);
      assert.equal(position.getX(), 1);
      assert.equal(position.getY(), 1);
    });

  });

  describe('#getX, #getY', function () {

    it('should get the x-coord', function () {
      var position = new Position(1, 1);
      assert.equal(position.getX(), 1);
    });

    it('should get the y-coord', function () {
      var position = new Position(2, 4);
      assert.equal(position.getY(), 4);
    });

  });

  describe('#setX, setY', function () {

    it('should set the x-coord', function () {
      var position = new Position(1, 1);
      position.setX(3, new Plateau(3, 3));
      assert.equal(position.getX(), 3);
    });

    it('should set the y-coord', function () {
      var position = new Position(2, 4);
      position.setY(2, new Plateau(3, 3));
      assert.equal(position.getY(), 2);
    });

  });

});

describe('Plateau', function () {

  describe('#constructor', function () {

    it('should create a new plateau with no parameters', function () {
      var plateau = new Plateau();
      assert.equal(plateau.getX(), 0);
      assert.equal(plateau.getY(), 0);
    });

    it('should create a new plateau with parameters', function () {
      var plateau = new Plateau(1, 1);
      assert.equal(plateau.getX(), 1);
      assert.equal(plateau.getY(), 1);
    });

    it('should throw an error if negative dimensions', function () {
      expect(function () {
        new Plateau(-1, -1);
      }).to.throw('Dimensions cannot be negative');
    });

  });

  describe('#getX, getY', function () {

    it('should get the x-dimension', function () {
      var plateau = new Plateau(1, 1);
      assert.equal(plateau.getX(), 1);
    });

    it('should get the y-dimension', function () {
      var plateau = new Plateau(2, 4);
      assert.equal(plateau.getY(), 4);
    });

  });

  describe('#setCoordinates', function () {

    it('should set the dimensions', function () {
      var plateau = new Plateau(1, 1);
      plateau.setDimensions(2, 2);
      assert.deepEqual(plateau, new Plateau(2, 2));
    });

    it('should throw an error when setting negative dimensions', function () {
      var plateau = new Plateau(1, 1);
      expect(function () {
        plateau.setDimensions(-2, 2);
      }).to.throw('Dimensions cannot be negative');
    });

  });

});
