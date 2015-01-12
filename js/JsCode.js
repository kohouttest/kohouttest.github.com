// by Chtiwi Malek on CODICODE.COM

var mousePressed = false;
var lastX, lastY;
var beginX, beginY;
var mirror = false;
var ctx;
var mystopwatch;

function InitThis() {
    ctx = document.getElementById('myCanvas').getContext("2d");

    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        beginX = e.pageX - $(this).offset().left;
        beginY = e.pageY - $(this).offset().top;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
        mystopwatch.stop();
    });

    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });
    
   var elems = document.getElementsByClassName("stopwatch");

   for (var i=0, len=elems.length; i<len; i++) {
     mystopwatch = new Stopwatch(elems[i]);
   }
   
   drawTriangle();
}

function Draw(x, y, isDown) {
    if (isDown) {
       mystopwatch.start();
       
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        if (mirror) {
          ctx.lineTo(beginX+(beginX-x), beginY+(beginY-y));
        } else {
          ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }
    
    if (mirror) {
       lastX = beginX+(beginX-x);
       lastY = beginY+(beginY-y);
     } else {
       lastX = x;
       lastY = y;
     }
    

    
    //Keith added to see in console x,y values
    console.log('x,y =' + x, + y);
}

function toggleMirror() { 
console.log("toggle Mirror");
console.log(mirror);

   if (mirror)
   {
      mirror = false;
      $("#mirrorButton").html('Not Mirrored');
   } else {
      mirror = true;
      $("#mirrorButton").html('Mirrored');
   }
   
   this.clearArea();
   mystopwatch.reset();
}

function drawTriangle() {
    // Draw line
        ctx.beginPath();
        //ctx.strokeStyle = '#00000000';  //black
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.moveTo(350, 150);
        ctx.lineTo(500, 250);
        ctx.lineTo(750, 150);
        ctx.closePath();
        ctx.stroke();  

        ctx.beginPath();
        //ctx.strokeStyle = '#00000000';
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.moveTo(285, 130);
        ctx.lineTo(500, 280);
        ctx.lineTo(840, 130);
        ctx.closePath();
        ctx.stroke(); 
        
        ctx.fillStyle = "blue";
  ctx.font = "bold 16px Arial";
  ctx.fillText("Start Drawing Here!", 430, 300);
}

function clearArea() {

    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
//    $("#clearButton").html('Save');
    
// console.log("Calling clearArea");
    
   drawTriangle();
   mystopwatch.reset();
        
}

// http://jsbin.com/IgaXEVI/167/edit?html,js,output
var Stopwatch = function(elem, options) {

  var timer       = createTimer(),
      startButton = createButton(" start ", start),
      stopButton  = createButton("stop ", stop),
      resetButton = createButton("reset ", reset),
      offset,
      clock,
      interval;

  // default options
  options = options || {};
  options.delay = options.delay || 1;

  // append elements     
  elem.appendChild(timer);
  elem.appendChild(startButton);
  elem.appendChild(stopButton);
  elem.appendChild(resetButton);

  // initialize
  reset();

  // private functions
  function createTimer() {
    return document.createElement("span");
  }

  function createButton(action, handler) {
    var a = document.createElement("a");
    a.href = "#" + action;
    a.innerHTML = action;
    a.addEventListener("click", function(event) {
      handler();
      event.preventDefault();
    });
    return a;
  }

  function start() {
    if (!interval) {
      offset   = Date.now();
      interval = setInterval(update, options.delay);
    }
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
    clock = 0;
    render();
  }

  function update() {
    clock += delta();
    render();
  }

  function render() {
    timer.innerHTML = clock/1000; 
  }

  function delta() {
    var now = Date.now(),
        d   = now - offset;

    offset = now;
    return d;
  }

  // public API
  this.start  = start;
  this.stop   = stop;
  this.reset  = reset;
};