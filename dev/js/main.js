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
    Pousada.colorbox();
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

    $('#slideshow-sobre').vegas({
      slides: [
        { src: './assets/images/Empresa-Interior-e-Lavanderia/Foto-faxada-perspectiva.jpg' },
        { src: './assets/images/Empresa-Interior-e-Lavanderia/Foto-interior-perspectiva.jpg' },
        { src: './assets/images/Empresa-Interior-e-Lavanderia/Foto-lavanderia-perspectiva-02.jpg' },
        { src: './assets/images/Empresa-Interior-e-Lavanderia/Foto-lavanderia-perspectiva-03.jpg' },
        { src: './assets/images/Empresa-Interior-e-Lavanderia/Foto-lavanderia-perspectiva-04.jpg' }
      ]
    });
  },
  /**
   * colorbox
   * @access public
   * @desc modal
   *
   * @return {Void}
   */
  colorbox: function() {
    'use strict';

    var seg = $('#segurancaInfo');

    $(".colorbox").colorbox({
      inline: true,
      width: '80%'
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
      submitHandler: function(formulario) {
        var dados = formulario.serialize();

        $.ajax({
          type: 'POST',
          url: 'processa.php',
          data: dados,
          dataType: 'text',
          cache: false,
          beforeSend: function() {
            botaoEnviar.text('Enviando...')
          },
          complete: function() {
            botaoEnviar.text('Processando...')
          },
          success: function() {
            setTimeout(function() {
              botaoEnviar.addClass('sucesso').text('Obrigado');
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