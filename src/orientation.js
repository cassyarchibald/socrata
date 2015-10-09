(function () {

  /**
   * An orientation object useful for deciding how to turn and advance.
   * get: The name of the given orientation.
   * turn: Turn to a specific orientation given the current orientation and the
   *       direction.
   * advance: Advance the rover's position given the current orientation.
   */
  var Orientation = {
    N: {
      get: 'N',
      turn: function (dir) {
        return (dir === 'L') ? Orientation.W : Orientation.E;
      },
      advance: function (position) {
        position.setY(position.getY() + 1);
      }
    },
    S: {
      get: 'S',
      turn: function (dir) {
        return (dir === 'L') ? Orientation.E : Orientation.W;
      },
      advance: function (position) {
        position.setY(position.getY() - 1);
      }
    },
    E: {
      get: 'E',
      turn: function (dir) {
        return (dir === 'L') ? Orientation.N : Orientation.S;
      },
      advance: function (position) {
        position.setX(position.getX() + 1);
      }
    },
    W: {
      get: 'W',
      turn: function (dir) {
        return (dir === 'L') ? Orientation.S : Orientation.N;
      },
      advance: function (position) {
        position.setX(position.getX() - 1);
      }
    }
  };

  Object.freeze(Orientation);

  if (typeof module !== 'undefined' && module.exports != null) {
      module.exports = Orientation;
  }

})();
