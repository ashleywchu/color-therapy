( function() {
  let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      textState = "fadeout",
      alpha = 1.0;

  window.onload = function() {
    callEventListeners();
    resizeCanvas();

    pulseText();
    animateBackground();
  };

  function callEventListeners() {
    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('orientationchange', resizeCanvas, false);
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function animateBackground() {
    setTimeout( () => {
      requestAnimationFrame(animateBackground);
      document.getElementById("canvas").style.backgroundColor = getRandomRgb();
    }, 2500);
  }

  // random rgb values
  function getRandomRgb () {
    let r = getRandomInt(0,255),
        g = getRandomInt(0,255),
        b = getRandomInt(0,255);

    return `rgb( ${r}, ${g}, ${b} )`;
  }

  // random integer in range
  function getRandomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // responsive canvas text size
  function getCanvasFont(typeface) {
    let fontBase = 1280, // full width of browser
        fontSize = 250,
        ratio = fontSize / fontBase,
        size = ratio * canvas.width;

    return `${size}px ${typeface}`;
  }

  // pulse text - fade in/fade out
  function pulseText(text) {
    let x = canvas.width / 6,
        y = canvas.height * 0.55;

    setTimeout( () => {
      requestAnimationFrame(pulseText);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.font = getCanvasFont("Helvetica");
      context.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
      context.fillText("breathe", x, y);

      if (textState === "fadeout") {
        alpha = alpha - 0.05;
        if (alpha < 0) {
          textState = "fadein";
        }
      } else if (textState === "fadein") {
        alpha = alpha + 0.05;
        if (alpha > 1.0) {
          textState = "fadeout";
        }
      }
    }, 65 );
  }

})();
