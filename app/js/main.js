$(function () {

  $('.star').rateYo({
    starWidth: "16px",
    ratedFill: "#f31515",
    fullStar: true,
    numStars: 5
  });

  
  var headerTop = $('.header__top, .header__link');
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
    $('.header__items').toggleClass('header__items--active');
    $('body').toggleClass('lock');
  });

  $('.header__link, .header__logo').on('click', function () {
    $('.burger').removeClass('burger--active');
    $('.header__items').removeClass('header__items--active');
    $('body').removeClass('lock');
  });

});

let radius = 150;
let autoRotate = true;
let rotateSpeed = -60;
let imgWidth = 140;
let imgHeight = 205;
setTimeout(init, 300);
let odrag = document.getElementById("drag-container");
let ospin = document.getElementById("spin-container");
let carousel = document.getElementById("carousel");
let aImg = ospin.getElementsByTagName("a");
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";
let ground = document.getElementById("ground");
ground.style.width = radius * 1 + "px";
ground.style.height = radius * 1 + "px";

function init(delayTime) {
  for (let i = 0; i < aImg.length; i++) {
    aImg[i].style.transform =
      "rotateY(" +
      i * (360 / aImg.length) +
      "deg) translateZ(" +
      radius +
      "px)";
    aImg[i].style.transition = "transform 1s";
    aImg[i].style.transitionDelay =
      delayTime || (aImg.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;
  obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = yes ? "running" : "paused";
}
let sX,
  sY,
  nX,
  nY,
  desX = 0,
  desY = 0,
  tX = 0,
  tY = 10;
if (autoRotate) {
  let animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
  ospin.style.animation = `${animationName} ${Math.abs(
    rotateSpeed
    )}s infinite linear`;
}
carousel.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  let sX = e.clientX,
    sY = e.clientY;
  this.onpointermove = function (e) {
    e = e || window.event;
    let nX = e.clientX,
      nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };
  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };
  return false;
};