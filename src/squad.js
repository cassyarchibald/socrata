(function () {

  /**
   * Creates an instance of a squad.  A squad is a group of rovers.  Commands
   * from NASA are sent to squads, which then distribute commands to each rover.
   * @param {Array<Rovers>} rovers The list of rovers within the squad.
   */
  var Squad = function (rovers) {
    this._rovers = rovers || [];
    this._plateau = {};
  };

  Squad.prototype = {

    /**
     * Returns the list of rovers.
     * @return {Array<Rovers>} _rovers
     */
    getRovers: function () {
      return this._rovers;
    },

    /**
     * Add rovers to the squad.
     * @param {Array<Rovers>} rovers The list of rovers to be added to the
     * squad.
     */
    addRovers: function (rovers) {
      this._rovers = this._rovers.concat(rovers);
    },

    /**
     * Ldnds this squad on a given plateau.
     * @param {Plateau} plateau The given plateau to land on.
     */
    landOn: function (plateau) {
      this._plateau = plateau;
    },

    /**
     * Executes NASA's command string.
     * @param {string} commands The string of commands NASA sends to this squad.
     */
    executesCommands: function (commands) {
      var squadStatus = '';
      var commandQueue = commands.split('\n');

      // Extract plateau data
      var plateauData = commandQueue.shift().split(' ');

      this._plateau.setDimensions(
        parseInt(plateauData[0]),
        parseInt(plateauData[1]));

      // Extract rover commands and send to each rover
      for (var i = 0; i < this._rovers.length; i++) {
        var rover = this._rovers[i];

        // First command line sets up each rover
        var setupData = commandQueue.shift().split(' ');

        rover.setup(
          parseInt(setupData[0]),
          parseInt(setupData[1]),
          setupData[2]);

        // Second command line is an exploration string
        rover.explore(commandQueue.shift());

        // Build the squad status report
        squadStatus += rover.status() + '\n';
      }

      // Return the squad status and log it to the console
      return squadStatus;
    }
  };

  if (typeof module !== 'undefined' && module.exports != null) {
      module.exports = Squad;
  }

})();
