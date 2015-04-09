var Plateau = require('./Plateau');

(function () {

  /**
   * Creates an instance of a position.  A position is a tuple of x, y
   * coordinates.
   * @param {number} x The x-coordinate of the position.
   * @param {number} y The y-coordinate of the position.
   */
  var Position = function (x, y) {
    this._x = x || 0;
    this._y = y || 0;
  };

  Position.prototype = {

    /**
     * Returns the x-coordinate of the position.
     * @return {number} _x
     */
    getX: function () {
      return this._x
    },

    /**
     * Returns the y-coordinate of the position.
     * @return {number} _y
     */
    getY: function () {
      return this._y;
    },

    /**
     * Sets the x-coordinate of the position.
     * @param {number} x The new x-coordinate.
     */
    setX: function (x) {
      this._x = x;
    },

    /**
     * Sets the y-coordinate of the position.
     * @param {number} y The new y-coordinate.
     */
    setY: function (y) {
      this._y = y;
    }
  };

  if (typeof module !== 'undefined' && module.exports != null) {
      module.exports = Position;
  }

})();
