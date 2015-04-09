var Position = require('./position'),
  Orientation = require('./orientation');

(function () {

  /**
   * Creates an instance of a rover.  A rover represents a single Mars rover
   * and has a position and orientation.
   * @param {number} x The x-coordinate of the rover's position.
   * @param {number} y The y-coordinate of the rover's position.
   * @param {string} orientation The orientation (N/S/W/E) of the rover.
   */
  var Rover = function (x, y, orientation) {
    this._position = new Position(x, y);
    this._orientation = Orientation[orientation] || Orientation.N;
  };

  Rover.prototype = {

    /**
     * Returns the position of the rover.
     * @return {number} _position
     */
    getPosition: function () {
      return this._position;
    },

    /**
     * Returns the orientation of the rover.
     * @return {number} _orientation
     */
    getOrientation: function () {
      return this._orientation.get;
    },

    /**
     * Sets up of the position and orientation of the rover.
     * @param {number} x The x-coordinate of the rover's position.
     * @param {number} y The y-coordinate of the rover's position.
     * @param {string} orientation The orientation (N/S/W/E) of the rover.
     */
    setup: function (x, y, orientation) {
      this._position.setX(x);
      this._position.setY(y);
      this._orientation = Orientation[orientation];
    },

    /**
     * Advances the rover one unit in its current orientation.
     */
    advance: function () {
      this._orientation.advance(this._position);
    },

    /**
     * Turns the rover in the given direction.
     * @param {string} direction The direction (L/R) the rover should turn in.
     */
    turn: function (direction) {
      this._orientation = this._orientation.turn(direction);
    },

    /**
     * Executes its exploration about the plateau.  For each command character,
     * either advance or turn in the given direction.
     * @param {string} commands A string of commands from NASA to be executed.
     */
    explore: function (commands) {
      for (var i = 0; i < commands.length; i++) {
        var cmd = commands.charAt(i);
        switch (cmd) {
          case 'M':
            this.advance();
            break;
          case 'L':
          case 'R':
            this.turn(cmd);
            break;
          default:
            throw new Error ('Invalid command: ' + cmd);
            break;
        }
      }
    },

    /**
     * Returns the rover's current status.
     * @return {string} The rover's current status.
     */
    status: function () {
      return this._position.getX() + ' ' +
             this._position.getY() + ' ' +
             this._orientation.get;
    }
  };

  if (typeof module !== 'undefined' && module.exports != null) {
      module.exports = Rover;
  }

})();
