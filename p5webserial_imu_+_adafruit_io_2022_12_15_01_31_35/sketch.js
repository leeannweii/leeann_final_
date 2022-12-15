const serial = new p5.WebSerial();


var portButton;  // serial port button
var showButton;  // variable to show/hide the port button
var inData;      // variable for incoming serial data
var accX;        // accelerometer X value
var accY;        // accelerometer Y value
var accZ;        // accelerometer Z value
var accXData = [];   // accelerometer X values array
var dataCounter = 0; // array index counter
var feedVal;  // value obtained from the feed
var feedTimer = 0;



function setup() {
  createCanvas(windowHeight, windowWidth);
  
  
  smooth();
   // check to see if serial is available:
   if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. \
           Try Chrome or MS Edge.");
  }
  // check for any ports that are available:
  serial.getPorts();
  // if there's no port chosen, choose one:
  serial.on("noport", makePortButton);
  // open whatever port is available:
  serial.on("portavailable", openPort);
  // handle serial errors:
  serial.on("requesterror", portError);
  // handle any incoming serial data:
  serial.on("data", serialEvent);
  serial.on("close", makePortButton)
  // add serial connect/disconnect listeners:
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);
}

// if there's no port selected, 
// make a port select button appear:
function makePortButton() {
  // create and position a port chooser button:
  portButton = createButton("choose port");
  portButton.position(30, height-30);
  // give the port button a mousepressed handler:
  portButton.mousePressed(choosePort);
  showButton = true; 
}

// make the port selector window appear:
function choosePort() {
  if (portButton) portButton.show();
  serial.requestPort();
}

function draw() {
  background(0);
  fill(0);
  noStroke();
  c = 100;

  text("accX: " + accX, 20, 30);
  text("accY: " + accY, 20, 45);
  text("accZ: " + accZ, 20, 60);
  
  // map values from range -10 - 10 to 0 - 255
  var r = map(accX, -10, 50, 10, 255)
  var g = map(accY, -10, 20, 0, 255)
  var b = map(accZ, -10, 10, 0, 255)

  


   if (accX < 0) {
   var slowxR = 255 * noise(3000 + frameCount / c);
   var slowxG = 255 * noise(2000 + frameCount / c);
   var slowxB = 255 * noise(5000 + frameCount / c);
   slowColor = color(slowxR, slowxG, slowxB);
   fill(slowxR, slowxG, slowxB)
   ellipse(width/2, height/2,440,440);
   }
  
 if (accZ < 0) {
   var slowzR = 255 * noise(4000 + frameCount / c);
   var slowzG = 255 * noise(3000 + frameCount / c);
   var slowzB = 255 * noise(2000 + frameCount / c);
   slowColor = color(slowzR, slowzG, slowzB);
   fill(slowzR, slowzG, slowzB)
   ellipse(width/2, height/2,350,350);
 }
   if (accX < 0) {
   var slowxxR = 255 * noise(300 + frameCount / c);
   var slowxxG = 255 * noise(1000 + frameCount / c);
   var slowxxB = 255 * noise(3000 + frameCount / c);
   slowColor = color(slowxxR, slowxxG, slowxxB);
   fill(slowxxR, slowxxG, slowxxB)
   ellipse(width/2, height/2,420,420);
   }
   
   if(accZ < -4 ) {
   var fastzR = 255 * noise(2000 + frameCount / c);
   var fastzG = 255 * noise(2000 + frameCount / c);
   var fastzB = 255 * noise(500 + frameCount / c);
   slowColor = color(fastzR, fastzG, fastzB);
   fill(fastzR, fastzG, fastzB)
   ellipse(width/2, height/2,500,0);
   noStroke();
  }
  
   if(accY < 2) {
   var slowyR = 255 * noise(6000 + frameCount / c);
   var slowyG = 255 * noise(7000 + frameCount / c);
   var slowyB = 255 * noise(2000 + frameCount / c);
   slowColor = color(slowyR, slowyG, slowyB);
   fill(slowyR, slowyG, slowyB)
   ellipse(width/2, height/2,400,400);
   noStroke();
  }
  
   if (accX < -5) {
   var slowxxxR = 255 * noise(5000 + frameCount / c);
   var slowxxxG = 255 * noise(4000 + frameCount / c);
   var slowxxxB = 255 * noise(6000 + frameCount / c);
   slowColor = color(slowxxxR, slowxxxG, slowxxxB);
   fill(slowxxxR, slowxxxG, slowxxxB)
   ellipse(width/2, height/2,200,200);
   }
  
 if (accZ < 4) {
   var slowzzR = 255 * noise(100 + frameCount / c);
   var slowzzG = 255 * noise(3000 + frameCount / c);
   var slowzzB = 255 * noise(200 + frameCount / c);
   slowColor = color(slowzzR, slowzzG, slowzzB);
   fill(slowzzR, slowzzG, slowzzB)
   ellipse(width/2, height/2,150,150);
 }
   if(accY < -3) {
   var slowyyR = 255 * noise(6000 + frameCount / c);
   var slowyyG = 255 * noise(7000 + frameCount / c);
   var slowyyB = 255 * noise(2000 + frameCount / c);
   slowColor = color(slowyyR, slowyyG, slowyyB);
   fill(slowyyR, slowyyG, slowyyB)
   ellipse(width/2, height/2,220,220);
   noStroke();
  }

   if(accY > 1) {
   var fastR = 255 * noise(6000 + frameCount / c);
   var fastG = 255 * noise(7000 + frameCount / c);
   var fastB = 255 * noise(2000 + frameCount / c);
   slowColor = color(fastR, fastG, fastB);
   fill(fastR, fastG, fastB)
   ellipse(width/2, height/2,220,220);
   noStroke();
  }
  
   if(accX > 1) {
   var fastxR = 255 * noise(4000 + frameCount / c);
   var fastxG = 255 * noise(5000 + frameCount / c);
   var fastxB = 255 * noise(1000 + frameCount / c);
   slowColor = color(fastxR, fastxG, fastxB);
   fill(fastxR, fastxG, fastxB)
   ellipse(width/2, height/2,300,300);
   noStroke();
  }
  
   if(accZ > 1) {
   var fastzzR = 255 * noise(4000 + frameCount / c);
   var fastzzG = 255 * noise(3000 + frameCount / c);
   var fastzzB = 255 * noise(1000 + frameCount / c);
   slowColor = color(fastzzR, fastzzG, fastzzB);
   fill(fastzzR, fastzzG, fastzzB)
   ellipse(width/2, height/2,400,400);
   noStroke();
  }
  
    
   if(accZ > 0) {
   var fastzzzR = 255 * noise(4000 + frameCount / c);
   var fastzzzG = 255 * noise(3000 + frameCount / c);
   var fastzzzB = 255 * noise(1000 + frameCount / c);
   slowColor = color(fastzzzR, fastzzzG, fastzzzB);
   fill(fastzzzR, fastzzzG, fastzzzB)
   ellipse(width/2, height/2,310,310);
   noStroke();
  }
  
      
   if(accZ < -3) {
   var fastzzzzR = 255 * noise(4000 + frameCount / c);
   var fastzzzzG = 255 * noise(2000 + frameCount / c);
   var fastzzzzB = 255 * noise(1000 + frameCount / c);
   slowColor = color(fastzzzzR, fastzzzzG, fastzzzzB);
   fill(fastzzzzR, fastzzzzG, fastzzzzB)
   ellipse(width/2, height/2,120,120);
   noStroke();
  }
  
  
   if (accX < -8) {
   var slowxxxxR = 255 * noise(2000 + frameCount / c);
   var slowxxxxG = 255 * noise(8000 + frameCount / c);
   var slowxxxxB = 255 * noise(3000 + frameCount / c);
   slowColor = color(slowxxxxR, slowxxxxG, slowxxxxB);
   fill(slowxxxxR, slowxxxxG, slowxxxxB)
   ellipse(width/2, height/2,100,100);
   }
   
  
   if(accY > 3) {
   var fastyR = 255 * noise(6000 + frameCount / c);
   var fastyG = 255 * noise(7000 + frameCount / c);
   var fastyB = 255 * noise(2000 + frameCount / c);
   slowColor = color(fastyR, fastyG, fastyB);
   fill(fastyR, fastyG, fastyB)
   ellipse(width/2, height/2,230,230);
   noStroke();
  }
    
   if(accX > 1) {
   var fastxxR = 255 * noise(6000 + frameCount / c);
   var fastxxG = 255 * noise(2000 + frameCount / c);
   var fastxxB = 255 * noise(4000 + frameCount / c);
   slowColor = color(fastxxR, fastxxG, fastxxB);
   fill(fastxxR, fastxxG, fastxxB)
   ellipse(width/2, height/2,100,100);
   noStroke();
  }
  
      
   if(accZ < 1) {
   var fastzzzzzR = 255 * noise(6000 + frameCount / c);
   var fastzzzzzG = 255 * noise(2000 + frameCount / c);
   var fastzzzzzB = 255 * noise(4000 + frameCount / c);
   slowColor = color(fastzzzzzR, fastzzzzzG, fastzzzzzB);
   fill(fastzzzzzR, fastzzzzzG, fastzzzzzB)
   ellipse(width/2, height/2,100,100);
   noStroke();
  }
  
  
   if(accZ > 1) {
   var fastsecondR = 255 * noise(250 + frameCount / c);
   var fastsecondG = 255 * noise(3000 + frameCount / c);
   var fastsecondB = 255 * noise(1000 + frameCount / c);
   slowColor = color(fastsecondR, fastsecondG, fastsecondB);
   fill(fastsecondR, fastsecondG, fastsecondB)
   ellipse(width/4, height/4,100,100);
   noStroke();
  }
  
   if(accZ > 1) {
   var fastsecondzR = 255 * noise(2000 + frameCount / c);
   var fastsecondzG = 255 * noise(200 + frameCount / c);
   var fastsecondzB = 255 * noise(1000 + frameCount / c);
   slowColor = color(fastsecondzR, fastsecondzG, fastsecondzB);
   fill(fastsecondzR, fastsecondzG, fastsecondzB)
   ellipse(width/4, height/4,80,80);
   noStroke();
  }
  
  if(accZ > 1) {
   var fastsecondzzR = 255 * noise(300 + frameCount / c);
   var fastsecondzzG = 255 * noise(20 + frameCount / c);
   var fastsecondzzB = 255 * noise(100 + frameCount / c);
   slowColor = color(fastsecondzzR, fastsecondzzG, fastsecondzzB);
   fill(fastsecondzzR, fastsecondzzG, fastsecondzzB)
   ellipse(width/4, height/4,50,50);
   noStroke();
  }
  
   if (accX < -5) {
   var slowxxxx2R = 255 * noise(6000 + frameCount / c);
   var slowxxxx2G = 255 * noise(2000 + frameCount / c);
   var slowxxxx2B = 255 * noise(3000 + frameCount / c);
   slowColor = color(slowxxxx2R, slowxxxx2G, slowxxxx2B);
   fill(slowxxxx2R, slowxxxx2G, slowxxxx2B)
   ellipse(width/5, height/5,100,100);
   }
  
  
  
  
  // draw a graph of accXData array:
  stroke(0);
  for (var i = 1; i < width; i++)
    line(i, height/6 + accXData[i-1] * 2, 
         i, height/6+ accXData[i] * 2);
  
  fill(0);
  if(!showButton) {
    text("press 'p' to show/hide serial port button", 
         20, height-20);
  }
}

// open the selected port, and make the port
// button invisible:
function openPort() {
  // wait for the serial.open promise to return,
  // then call the initiateSerial function
  serial.open().then(initiateSerial);

  // once the port opens, let the user know:
  function initiateSerial() {
    console.log("port open");
  }
  // hide the port button once a port is chosen:
  if (portButton) portButton.hide();
}

// pop up an alert if there's a port error:
function portError(err) {
  alert("Serial port error: " + err);
}
// read any incoming data as a string
// (assumes a newline at the end of it):
function serialEvent() {
  //inData = Number(serial.read());
  inData = serial.readStringUntil('\n');
  if(inData != null && inData.length > 0) {
    print(inData);
    var values = split(inData, ', ');
    if (values.length >= 3) {
      accX = Number(values[0]);
      accY = Number(values[1]);
      accZ = Number(values[2]);
      
      accXData[dataCounter] = accX;  // add last reading
      if(dataCounter < width)
        dataCounter += 1;
      else
        dataCounter = 0;
    }
  }
}

// try to connect if a new serial port 
// gets added (i.e. plugged in via USB):
function portConnect() {
  console.log("port connected");
  serial.getPorts();
}

// if a port is disconnected:
function portDisconnect() {
  serial.close();
  console.log("port disconnected");
}

function closePort() {
  serial.close();
}

function keyPressed() {
  if(key == 'p') {
    if (!portButton) {
      makePortButton();
    }
    else if (showButton) {
      portButton.hide();
      showButton = false; 
    }
    else {
      portButton.show();
      showButton = true; 
    }
  }
}


function aioGetData(aioJsonData)
{
  //print(aioJsonData);
  feedVal = aioJsonData.last_value;
  print(feedVal);
}