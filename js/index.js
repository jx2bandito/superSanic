$(document).ready(function() {
  // $("#showPos").html(marginSanic);
  //dragAndPos($("#controlText"), $("#showPos"));

  //   Caching
  var cloud1 = $("#cloud1").children("svg");
  var cloud2 = $("#cloud2").children("svg");
  var bodyWrapper = $("#bodyWrapper");
  var animateGWrapper = $("#animateGWrapper");
  var groundWrapper = $("#groundWrapper");

  var sanicTL = new TimelineMax({
    paused: true
  });
  var cloudTL = new TimelineMax({
    repeat: -1,
    yoyo: true,
    paused: true
  });
  var ringTL = new TimelineMax({
    repeat: -1,
    paused: true
  });

  var ctrlReversed = true;
  var mainPaused = false;
  var speed = 1;
  var restart = function() {
    sanicTL.play(0);
    ringTL.play(0);
    cloudTL.play(0);
  };

  var reverse = function() {
    sanicTL.reverse();
    ringTL.reverse();
    cloudTL.reverse();
  };

  var pauseResume = function() {
    if (mainPaused) {
      sanicTL.resume();
      ringTL.resume();
      cloudTL.resume();

      $("#showSpeed").html("SPEED: " + speed * 100 + "%");
      mainPaused = false;
      return false;
    } else {

      $("#showSpeed").html("PAUSED");
      sanicTL.pause();
      ringTL.pause();
      cloudTL.pause();
      mainPaused = true;
      return false;
    }
  };

  var speedUp = function() {
    if (speed >= 5) {
      return false;
    }

    sanicTL.timeScale(speed += .25);
    ringTL.timeScale(speed);
    cloudTL.timeScale(speed);
    $("#showSpeed").html("SPEED: " + speed * 100 + "%");
  };

  var slowDown = function() {
    if (speed <= .25) {
      return false;
    }
    sanicTL.timeScale(speed -= .25);
    ringTL.timeScale(speed);
    cloudTL.timeScale(speed);
    $("#showSpeed").html("SPEED: " + speed * 100 + "%");
  };

  $(document).on("keydown", function(key) {
    key.preventDefault();
    switch (key.which) {
      case 39:
        speedUp();
        return false;
      case 37:
        slowDown();
        return false;
      case 13:
        restart();
        return false;
      case 8:
        reverse();
        return false;
      case 32:
        pauseResume()
        return false;
      default:
        return false;
    }
  });

  sanicTL
    .to(bodyWrapper, 1, {
      autoAlpha: 1
    })
    //////////////Ground animation
    .fromTo(animateGWrapper, 1.5, {
      y: "15%"
    }, {
      y: "0%",
      autoAlpha: 1,
      ease: RoughEase.ease.config({
        points: 50
      })
    }, "forming")

  .from(groundWrapper.find("path"), .75, {
      scale: 0,
      ease: RoughEase.ease.config({
        points: 50
      })
    }, "-=.75")
    //////////////Clouds animation
    .fromTo(cloud1, 1, {
      x: 100,
      autoAlpha: 0,
      ease: Power2.easeOut
    }, {
      x: 0,
      autoAlpha: 1
    })

  .fromTo(cloud2, 1, {
      x: 100,
      autoAlpha: 0,
      ease: Power2.easeOut
    }, {
      x: 0,
      autoAlpha: 1
    }, "-=0.5")
    /////////Shrubbery animation
    .to($("#shrubbery"), .1, {
      scale: 1
    }, "=-.5")
    //////////Hill Animation 
    .fromTo($(".hill").children("path"), .5, {
        attr: {
          d: "m68.99998,299q222.99999,-.00005 445.99998,0"
        }
      }, {
        attr: {
          d: "m68.99998,299q222.99999,-504.00005 445.99998,0"
        },
        ease: Bounce.easeOut
      },
      "bouncing")
    .from($("#hillRoot"), .5, {
      rotationY: 20,
      ease: Bounce.easeOut
    }, "bouncing -=0.15")
    .to($("#miniSanic"), .01, {
      autoAlpha: 1
    }, "bouncing -=.45")
    .to($("#miniSanic"), .5, {
      rotationZ: 7080 * 3,
      y: "-5000%"
    }, "bouncing -=.45")

  .staggerFromTo($(".blackdot"), .5, {
    cycle: {
      x: [20, 0],
      y: [0, -40]
    },
    autoAlpha: 0
  }, {
    cycle: {
      x: [0, 0],
      y: [0, 0]
    },
    autoAlpha: 1,
    ease: Bounce.easeOut
  }, .25, "bouncing -=.1")

  //////////////Text animation
  .fromTo($("#hud"), .5, {
      autoAlpha: 0,
      y: "-50%"
    }, {
      autoAlpha: 1,
      y: "0%"
    })
    .fromTo($("#sanicTextBox"), .5, {
      autoAlpha: 0,
      y: "-10%"
    }, {
      autoAlpha: 1,
      y: "0%"
    }, "-=.15")

  .from($(".mainText"), .5, {
    scale: 0,
    ease: Back.easeOut
  }, 'fall')

  .from($(".dropText"), .5, {
      autoAlpha: 0,
      attr: {
        dx: 0,
        dy: 0
      }
    }, "fall")
    .staggerFrom($(".fleshBTN"), .5, {
      autoAlpha: 0,
      scale: 0,
      ease: Power2.easeIn
    }, .15, "fall")
    .staggerFrom($(".dropBTN"), .5, {
      autoAlpha: 0,
      scale: 0,
      ease: Power2.easeIn
    }, .15, "-=.5")
    //////Sanic animation
    .fromTo("#sanicWrapper", .4, {
      rotation: 7080 * 3,
      y: "-3000%"
    }, {
      autoAlpha: 1,
      rotation: 0,
      y: "0%"
    }, "fall")

  .to("#sanicWrapper", 3, {
      rotation: 7080 * 3,
      x: "5000%",
      delay: 1
    }, "fall+=.5")
    ///////Shrubbery animation end
    .to($("#shrubbery").find("ellipse"), .25, {
      rotation: -20,
      scale: 1.2,
      y: "-5%",
      x: "20%"
    }, "fall+=1.7")
    .to($("#shrubbery").find("ellipse"), .75, {
      rotation: -5,
      scale: 1,
      y: "+=5%",
      x: "-=20%",
      ease: Elastic.easeOut
    }, "fall+=2.15");

  ///Cloud timeline
  cloudTL
    .staggerFromTo(".floating", 2, {
      rotation: 2,
    }, {
      rotation: 0,
      y: "5%",
      x: "5%"
    }, .5);

  ///Ring timeline
  ringTL
    .to($("#ringRoot"), 2, {
      rotationY: 180,
      onStart: function() {
        TweenMax.to($(".ringSVG"), 2, {
          stroke: "#f2f26d"
        })
      }
    }, "-=.5")
    .to($("#ringRoot"), 2, {
      rotationY: 360,
      onStart: function() {
        TweenMax.to($(".ringSVG"), 2, {
          stroke: "#97944B"
        });
      }
    });

  sanicTL.timeScale(speed);

  var controlTL = new TimelineMax({});
  controlTL
  //
    .to(".mainButton", .5, {
      top: "-25%",
      ease: Power4.easeInOut
    }, "simul")
    //

  .fromTo("#controlText", 1, {
      height: "4vw",
      width: "7vw",
      left: "89.33%"
    }, {
      width: "17vw",
      left: "81.99%"
    }, "simul")
    .to("#controlText", 1, {
      height: "18vw"
    }, "simul+=1")
    //
    .fromTo(".iconY", 2, {
      width: "10vw"
    }, {
      width: "4vw",
      left: "0%",
      top: "0%",
      ease: Power4.easeInOut
    }, "simul-=.5")
    //
    .fromTo(".iconX", 2, {
      width: "8vw"
    }, {
      width: "4vw",
      left: "0%",
      top: "0%",
      ease: Power4.easeInOut
    }, "simul")
    // 
    .fromTo(".mainButton", 2, {
      rotation: 45
    }, {
      rotation: 180 - 45,
      borderRadius: "50%",
      backgroundColor: "red",
      ease: Power4.easeInOut
    }, "simul")
    //
    .to(".mainButton", 1, {
      borderLeft: ".5vw solid black",
      borderTop: ".5vw solid black",
      delay: .5,
      ease: Power4.easeInOut
    }, "simul")
    .timeScale(2);

  $("#controlToggle").click(function() {
    if (ctrlReversed) {
      controlTL.reverse();
      ctrlReversed = false;
      return false;
    } else {
      controlTL.play(0);
      ctrlReversed = true;
      return false;
    }
  });

});