var Pousada = {
  /**
   * instances
   * @access public
   * @desc instancias
   *
   * @type {Object}
   */
  instances: {},
  /**
   * variables
   * @access public
   * @desc variaveis
   *
   * @type {Object}
   */
  variables: {},
  /**
   * init
   * @access public
   * @desc constructor
   *
   * @return {Void}
   */
  init: function() {
    "use strict";

    Pousada.initFunction();
  },
   /**
   * initFunction
   * @access public
   * @desc initFunction
   *
   * @return {Void}
   */
  initFunction: function() {
      "use strict";

      console.log("Pousada você que sabe");
  }
}

$(document).on("ready", function() {
  "use strict";

  Pousada.init();
});