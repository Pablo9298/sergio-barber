$(function () {

  var headerTop = $('.header__burger');
  var doc = $(document);

  function headerFixed() {
    var threshold = doc.scrollTop() > 150;

    if (threshold) {
      headerTop.addClass('scrolled');
    } else {
      headerTop.removeClass('scrolled');
    }
  }
  $(window).on('scroll', headerFixed);

  headerFixed();

  $('.header__link, .logo, .footer__link').on('click', function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });

  $('.burger').on('click', function () {
    $('.burger').toggleClass('burger--active');
    $('.header__list').toggleClass('header__list--active');
    $('body').toggleClass('lock');
  });

  $('.header__link, .header__logo').on('click', function () {
    $('.burger').removeClass('burger--active');
    $('.header__list').removeClass('header__list--active');
    $('body').removeClass('lock');
  });

});