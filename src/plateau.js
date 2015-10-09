(function () {

  /* Creates an instance of a plateau.  A plateau is a rectangular plot of
   * terrain that the squad of rovers move on.
   * @param {number} xDimension The width of the plateau.
   * @param {number} yDimension The height of the plateau.
   */
  var Plateau = function (xDimension, yDimension) {

    var negativeDimensions = xDimension < 0 || yDimension < 0;

    if (negativeDimensions) {
      throw new Error('Dimensions cannot be negative');
    }

    this._xDimension = xDimension || 0;
    this._yDimension = yDimension || 0;
  };

  Plateau.prototype = {

    /* Returns the x dimension of the plateau.
     * @return {number} _xDimension
     */
    getX: function () {
      return this._xDimension;
    },

    /* Returns the y dimension of the plateau.
     * @return {number} _yDimension
     */
    getY: function () {
      return this._yDimension;
    },

    /* Sets the dimensions of the plateau.
     * @param {number} xDimension The new width of the plateau.
     * @param {number} yDimension The new height of the plateau.
     */
    setDimensions: function (xDimension, yDimension) {

      if (xDimension < 0 || yDimension < 0) {
        throw new Error('Dimensions cannot be negative');
      }

      this._xDimension = xDimension;
      this._yDimension = yDimension;
    }
  };

  if (typeof module !== 'undefined' && module.exports != null) {
    module.exports = Plateau;
  }

})();
