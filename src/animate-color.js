( function() {
  window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    pulseText(context);

    setInterval( () => {
      document.getElementById("canvas").style.backgroundColor = randomRgb();
    }, 2500);
  };

  // random rgb values
  function randomRgb () {
    let r = randomInt(0,255),
        g = randomInt(0,255),
        b = randomInt(0,255);

    return `rgb( ${r}, ${g}, ${b} )`;
  }

  // random integer in range
  function randomInt(min,max) {
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

  // pulse text
  function pulseText(context) {
    let x = canvas.width / 6,
        y = canvas.height * 0.55,
        state = "fadeout",
        alpha = 1.0;

    setInterval( () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.font = getCanvasFont("Helvetica");
      context.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
      context.fillText("breathe", x, y);

      if (state === "fadeout") {
        alpha = alpha - 0.05;
        if (alpha < 0) {
          state = "fadein";
        }
      } else if (state === "fadein") {
        alpha = alpha + 0.05;
        if (alpha > 1.0) {
          state = "fadeout";
        }
      }
    }, 105);
  }

})();
