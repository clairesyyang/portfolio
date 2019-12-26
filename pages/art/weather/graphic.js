var bg;
var snow, drop; // the pictures of snow and raindrop
var colorFrom, colorTo; // the rainy cloud will change color by time
var changeY = 0; // the raindrop's changing position Y
var weatherType = 'rainy'; // the first icon
var sel, selWeather; // the selection dom
var yoff = 0.0;  

// the selection doms 1 —— change time
function selectionInit() {
	sel = createSelect();
	sel.position(25, 25);
	var selOptions = ['morning', 'dusk', 'evening']
	for (var i = 0; i < selOptions.length; i++) {
		sel.option(selOptions[i]);
	}
	sel.changed(timeHandler);
}

function timeHandler() {
	var value = sel.value();
	if (value == 'morning') {
		bg = loadImage('theDay.png');
	} else if (value == 'dusk') {
		bg = loadImage('theDusk.png');
	} else if (value == 'evening') {
		bg = loadImage('theNight.png');
	}
}


// the selection doms 2 —— change weather
function weatherSelectionInit() {
	selWeather = createSelect();
	selWeather.position(25, 60);
	var selOptions = ['rainy', 'sunny', 'snowy', 'cloudy']
	for (var i = 0; i < selOptions.length; i++) {
		selWeather.option(selOptions[i]);
	}
	selWeather.changed(weatherTimeHandler);
}


function weatherTimeHandler() {
	weatherType = selWeather.value();
}


// the particle system of snow
function Snow(posX, posY) {
	this.posX = posX;
	this.posY = posY;
	this.changePosX = random(-100, 100);
	this.changePosY = random(0, 100);
	this.lifespan = 255;
}

Snow.prototype = {
	constructor: Snow,
	move: function () {
		this.posX += this.changePosX;
		this.posY += this.changePosY;
		this.lifespan -= 3;
	}
};

var snows = [];



// the particle system of raindrop
function Raindrop(posX, posY) {
	this.posX = posX;
	this.posY = posY;
	this.changePosX = random(-100, 100);
	this.changePosY = random(0, 100);
	this.lifespan = 255;
}

Raindrop.prototype = {
	constructor: Raindrop,
	move: function () {
		this.posX += this.changePosX;
		this.posY += this.changePosY;
		this.lifespan -= 3;
	}
};

var raindrops = [];



function setup() {
	createCanvas(windowWidth, windowHeight);
	bg = loadImage("theDay.png");
	selectionInit();
	weatherSelectionInit();
	snow = loadImage("Snow.png");
	drop = loadImage("drop.png");
}


function draw() {
	background(bg);
	textSize(18);
	textStyle(BOLD);
	fill(255, 255, 255);
	noStroke();
	text("Change Time", 180, 41);
	text("Change Weather", 180, 80);	
	changeWeather(weatherType);
}


// select weather then draw the function
function changeWeather(type) {
	if (type == 'rainy') {
		rainy(width / 2, height / 2 - 60);
	} else if (type == 'cloudy') {
		cloudy(width / 2 + 50, height / 2 - 80, 90);
	} else if (type == 'sunny') {
		sunny(width / 2, height / 2 - 50, 135);
	} else {
		snowy(width / 2, height / 2 - 50, 135);
	}
}

function sunny(x, y, r) {
	noFill();
	strokeWeight(35);
	stroke("#FF6C18");
	ellipse(x, y, r/1.4, r/1.4);
	push();
	translate(x, y);
	rotate(frameCount / 100);
	for (var a = 0; a < 360; a += 45) {
		strokeWeight(8);
		line(115 * cos(a * PI / 180), 115 * sin(PI * a / 180), 100 * cos(a * PI / 180), 100 * sin(PI * a / 180));
	}
	pop();
	noFill();
	strokeWeight(3);
	ellipse(x, y, r + 15, r + 15);
	ellipse(x, y, r + 30, r + 30);
	textAlign(CENTER);
	textSize(50);
	text("SUNNY", x, y + 180);
	strokeWeight(2);
	textSize(25);
	text("CLICK MOUSE TO SEE THE HEAT WAVE", x, y + 220);
  noStroke();
	fill(255,0,0,50);
	//if (mouseIsPressed)
	beginShape();
	var xoff = 5;  
	for (var x = 0; x <= width; x += 20) {
		var y = map(noise(xoff, yoff), 0, 1, height-200,700);
		if (mouseIsPressed)
		vertex(x, y); 
		xoff += 0.03;
	}
	yoff += 0.01;
	vertex(width, height);
	vertex(0, height);
	endShape(CLOSE);
}

function cloudy(x, y, r) {
	fill("#FF6C18");
	noStroke();
	ellipse(x, y, r, r);
	stroke("#FF6C18");
	push();
	translate(x, y);
	rotate(frameCount / 100);
	for (var a = 0; a < 360; a += 45) {
		strokeWeight(5);
		line(75 * cos(a * PI / 180), 75 * sin(PI * a / 180), 65 * cos(a * PI / 180), 65 * sin(PI * a / 180));
	}
	pop();
	noFill();
	strokeWeight(2);
	ellipse(x, y, r + 10, r + 10);
	ellipse(x, y, r + 20, r + 20);

	fill(255, 255, 255);
	noStroke();
	ellipse(width / 2, height / 2 - 50, 110, 110);
	ellipse(width / 2 - 60, height / 2, 110, 110);
	ellipse(width / 2 + 60, height / 2, 110, 110);
	ellipse(width / 2, height / 2 + 10, 80, 80);
	ellipse(width / 2 - 50, height / 2 - 45, 50, 50);
	ellipse(width / 2 + 50, height / 2 - 45, 50, 50);

	stroke(255, 255, 255);
	strokeWeight(2);
	noFill();
	textAlign(CENTER);
	textSize(50);
	text("CLOUDY", width / 2, height / 2 - 50 + 180);
	strokeWeight(2);
	textSize(25);
	text("CLICK MOUSE TO SAY HELLO", width / 2, height / 2 - 50 + 220);
	if (mouseIsPressed){
    fill("pink");
		textSize(15);
		text("Hello", width/2+120,height/2-140);
		noStroke();
		ellipse(width/2+80,height/2-70,20,10);
		fill("black");
		ellipse(width/2+75,height/2-85,10,10);
		//ellipse(width/2+55,height/2-85,10,10);
}
}

// the raindrop will move back to the initial position
function autoDown() {
	if(changeY>0){
		changeY --;
		setTimeout(autoDown,10);
	}
}

function rainy(x, y) {
	stroke("#5FE8E0");
	strokeWeight(5);
	
	push();
	frameRate(10);
	raindrops.push(new Raindrop(width / 2, -100));
	for (var i = 0; i < raindrops.length; i++) {
		if (raindrops[i].lifespan <= 0) {
			raindrops.splice(i, 50);
		} else {
			noStroke();
			fill(255, 55, 255);
			push();
			image(drop, raindrops[i].posX, raindrops[i].posY, drop.width / 4.5, drop.height / 4.5);
			pop();
			raindrops[i].move();
		}
	}
	pop();
	

	push();
	translate(width / 2, height / 2);
	imageMode(CENTER);
	for (var a = -1; a < 2; a++) {
		for (var b = -1; b < 2; b++) {
			image(drop, a*50, b*45+changeY, drop.width / 3.8, drop.height / 3.8);
		}
	}
	pop();
	if (changeY>15){
		setTimeout(autoDown,10);
  } 
	changeY++;

	colorFrom2 = color(200, 200, 200);
	colorTo2 = color(255, 255, 255);
	var Arange2 = map(frameCount, 0, width, 0, 6);
	var lerpedCol2 = lerpColor(colorFrom2, colorTo2, Arange2);
	fill(lerpedCol2);
	noStroke();
	ellipse(x, y - 50, 110, 110);
	ellipse(x - 60, y, 110, 110);
	ellipse(x + 60, y, 110, 110);
	ellipse(x, y + 10, 80, 80);
	ellipse(x - 50, y - 45, 50, 50);
	ellipse(x + 50, y - 45, 50, 50);

	stroke(lerpedCol2);
	strokeWeight(2);
	noFill();
	textAlign(CENTER);
	textSize(50);
	text("RAINY", width / 2, height / 2 - 50 + 180);
}


function snowy(x, y, r) {
	push();
	translate(width / 2, height / 2 - 50);
	rotate(frameCount / 100);
	imageMode(CENTER);
	image(snow, 0, 0, snow.width / 2.1, snow.height / 2.1);
	pop();
	
	push();
	frameRate(5);
	snows.push(new Snow(width / 2, -100));
	for (var i = 0; i < snows.length; i++) {
		if (snows[i].lifespan <= 0) {
			snows.splice(i, 50);
		} else {
			noStroke();
			fill(255, 255, 255);
			push();
			ellipse(snows[i].posX, snows[i].posY, 15, 15);
			pop();
			snows[i].move();
		}
	}
	pop();
	
	noFill();
	strokeWeight(5);
	stroke(255, 255, 255);
	ellipse(x, y, r + 20, r + 20);
	ellipse(x, y, r + 35, r + 35);
	strokeWeight(3);
	textAlign(CENTER);
	textSize(50);
	text("SNOWY", x, y + 180);
}
