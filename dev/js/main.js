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
    Pousada.validate();
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
  /**
   * slideshow
   * @access public
   * @desc slideshow
   *
   * @return {Void}
   */
  slideshow: function() {
    'use strict';

    $('#slideshow-home').vegas({
      slides: [
        { src: './assets/images/suites/panoramicas/foto-panoramica-suite-brilhante-02.jpg' },
        { src: './assets/images/suites/panoramicas/foto-panoramica-suite-brilhante-04.jpg' },
        { src: './assets/images/suites/panoramicas/foto-panoramica-suite-rubi-duplex-17.jpg' },
        { src: './assets/images/suites/panoramicas/foto-panoramica-suite-rubi-34.jpg' },
        { src: './assets/images/suites/panoramicas/foto-panoramica-suite-esmeralda-24.jpg' },
        { src: './assets/images/suites/panoramicas/foto-panoramica-suite-perola-20.jpg' },
        { src: './assets/images/suites/panoramicas/foto-panoramica-suite-diamante-11.jpg' },
        { src: './assets/images/suites/panoramicas/foto-panoramica-suite-ouro-33.jpg' },
        { src: './assets/images/suites/panoramicas/foto-panoramica-suite-prata-08.jpg' }
      ],
      animation: 'kenburns'
    });

    $('#slideshow-sobre').vegas({
      slides: [
        { src: './assets/images/Empresa-Interior-e-Lavanderia/Foto-faxada-perspectiva.jpg' },
        { src: './assets/images/Empresa-Interior-e-Lavanderia/Foto-interior-perspectiva.jpg' },
        { src: './assets/images/Empresa-Interior-e-Lavanderia/Foto-lavanderia-perspectiva-02.jpg' },
        { src: './assets/images/Empresa-Interior-e-Lavanderia/Foto-lavanderia-perspectiva-03.jpg' },
        { src: './assets/images/Empresa-Interior-e-Lavanderia/Foto-lavanderia-perspectiva-04.jpg' }
      ],
      animation: 'kenburns'
    });
  },
  /**
   * validate
   * @access public
   * @desc validacao do formulario em promocoes
   *
   * @return {Void}
   */
  validate: function() {
    'use strict';

    var botaoEnviar = $('#btnPromocoes'),
        formulario = $('#formulario');

    jQuery.validator.setDefaults({
      errorClass: 'error',
      errorElement: 'span',
      validClass: 'valid'
    });

    formulario.validate({
      rules: {
        nome: {
          required: true,
          minlength: 3
        },
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        nome: {
          required: 'Digite seu nome',
          minlength: jQuery.validator.format('Mínimo {0} caracteres')
        },
        email: {
          required: 'Digite seu e-mail',
          email: 'Insira um e-mail válido'
        }
      },
      highlight: function(element, errorClass, validClass) {
        $(element).addClass(errorClass).removeClass(validClass);
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass(errorClass).addClass(validClass);
      },
      submitHandler: function(form) {
        var dados = $(form).serialize();

        $.ajax({
          type: 'POST',
          url: 'processa.php',
          data: dados,
          dataType: 'text',
          cache: false,
          beforeSend: function() {
            botaoEnviar.text('Enviando...');
          },
          complete: function() {
            botaoEnviar.text('Cadastrando...');
          },
          success: function() {
            setTimeout(function() {
              botaoEnviar.addClass('sucesso').text('Cadastrado com sucesso!');
              $('#nome, #email').val('');

              setTimeout(function() {
                botaoEnviar.removeClass('sucesso').text('Enviar');
              }, 1500);
            }, 1500);
          },
          error: function(xhr, ajaxOptions, thrownError) {
            console.log('Error: ' + xhr.status);
            console.log(thrownError);
          }
        });

        return false;
      }
    });
  }
}

$(document).on('ready', function() {
  'use strict';

  Pousada.init();
});