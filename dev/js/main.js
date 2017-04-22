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
    'use strict';

    Pousada.toggleMenu();
    Pousada.slideshow();
  },
   /**
   * toggleMenu
   * @access public
   * @desc mostra/esconde o menu em mobile
   *
   * @return {Void}
   */
  toggleMenu: function() {
    'use strict';

    var hamburguer = $('#hamburguer'),
        menu = $('.menu-principal'),
        menuMobile = $('.menu-principal-mobile');

    hamburguer.on('click', function() {
      menu.toggleClass('toggleMenu');
      $('body').toggleClass('noScroll');
      menuMobile.toggleClass('toggleMenuMobile');
      hamburguer.toggleClass('toggleMenuMobile');
    });
  },
  slideshow: function() {
    'use strict';

    $('#slideshow-home').vegas({
      slides: [
        { src: './assets/images/suites/Brilhante/Foto-suíte-36-brilhante-perspectiva-02.jpg' },
        { src: './assets/images/suites/Brilhante/Foto-suíte-36-brilhante-perspectiva-04.jpg' },
        { src: './assets/images/suites/Rubi-Duplex/Suíte-17/foto-suíte-17-rubi-duplex-perspectiva-01.jpg' },
        { src: './assets/images/suites/Rubi/Suíte-35/foto-suíte-35-rubiperspectiva-04.jpg' },
        { src: './assets/images/suites/Esmeralda/Suíte-24/Foto-suíte-24-esmeralda-perspectiva-01.jpg' },
        { src: './assets/images/suites/Perola/Suíte-20/foto-suíte-20-perola-vintage-perspectiva-01.jpg' },
        { src: './assets/images/suites/Diamante/Suíte-27/foto-suite-27-diamante-perspectiva-01.JPG' },
        { src: './assets/images/suites/Ouro/Suíte-33/Foto-suíte-33-ouro-perspectiva-01.jpg' },
        { src: './assets/images/suites/Prata/foto-suíte-08-prata-perspectiva-01.jpg' }
      ],
      timer: true
    });

    $('#slideshow-suites').vegas({
      slides: [
        { src: './assets/images/Empresa-Interior-e-Lavanderia/Foto-faxada-perspectiva.jpg' },
        { src: './assets/images/suites/Perola/Suíte-20/foto-suíte-20-perola-vintage-perspectiva-01.jpg' },
        { src: './assets/images/suites/Brilhante/Foto-suite-36-brilhante-perspectiva-02.jpg' },
        { src: './assets/images/suites/Diamante/Suíte-27/foto-suite-27-diamante-perspectiva-01.JPG' }
      ],
      timer: false
    });
  }
}

$(document).on('ready', function() {
  'use strict';

  Pousada.init();
});