var beatsArray = [];
var currMode = true;

var freqs = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

var barHeight;
var barWidth;
var barFreq;

var currFreq = 2;

var beatH;
var beatS;
var beatL;

var active = false;

function setup(){
	angleMode(DEGREES);
	createCanvas(window.innerWidth, window.innerHeight);	
	frameRate(60);
	colorMode(HSB, 360, 100, 100);
}

window.onload = function() {
  
  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");
  
  file.onchange = function() {
  	active = true;
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    //var canvas = document.getElementById("canvas");
    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = width;
    var HEIGHT = height;

    barWidth = (WIDTH / bufferLength) * 2.5;
    //barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;
	  
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#EFF2BA";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
	  	background(0);
	  	noStroke();
			fill(360);
			textSize(20);
			text("Currently holding frequency byte: "+currFreq, width/1000, height/15);

	    for (var i = 0; i < bufferLength; i++) {
	    	barFreq = i;
	      barHeight = dataArray[i];
	      if(i == 2)
					beatH = 360-(30*(255-barHeight)/15); 
				else
					beatH = 360-(330*barHeight/255);
				//+ (25 * (i/bufferLength));
				beatS = 100
				beatL = 50;
				for(var b in beatsArray){ //DRAW THE BEATS
					if(beatsArray[b].freq == i){
						beatsArray[b].draw(barHeight*width/1500, beatH, beatS, beatL);
					}
				}
				//bar colors
/*				noStroke();
				/*				if(i == 1 && barHeight < 250){
					beats.push(new Beat(WIDTH*1/3, HEIGHT*1/3, h, s, l, barHeight, true));
					beats.push(new Beat(WIDTH*2/3, HEIGHT*1/3, h, s, l, barHeight, true));
				}
				else if(i == 2 && barHeight < 250){
					beats.push(new Beat(WIDTH*1/3, HEIGHT*1/3, h, s, l, barHeight, true));
					beats.push(new Beat(WIDTH*2/3, HEIGHT*1/3, h, s, l, barHeight, true));
				}
				else if(i == 3){
					beats.push(new Beat(WIDTH*1/3, HEIGHT*1/3, h, s, l, barHeight, true));
					beats.push(new Beat(WIDTH*2/3, HEIGHT*1/3, h, s, l, barHeight, true));
				}
*/

/*				if(i == 5 && barHeight > 0){
					beats.push(new Beat(mouseX, mouseY, h, s, l));
				}
*/				
			}
	  }
    audio.play();
    renderFrame();
  };
}

function keyPressed(){
	if(keyCode == LEFT_ARROW && currFreq > 2){ //SWITCH CURRENT BEAT
		currFreq = currFreq - 1;
	} else if(keyCode == RIGHT_ARROW && currFreq < 20){ 
		currFreq = currFreq + 1;
	} else if(keyCode == DELETE){ //DELETE ALL BEATS
		beatsArray = [];
	} else if(keyCode == UP_ARROW){ //POPULATE RANDOM BEATS ON CANVAS
		for(var i=0; i < 50; i++){
			var randomBeat = random(100);
			if(randomBeat > 5){
				beatsArray.push(new Beat(random(width), random(height), random(freqs)));
			}
			else{
				beatsArray.push(new Beat(random(width), random(height), 2));
			}
		}
	} 
}
function mousePressed(){
	if(active){
		beatsArray.push(new Beat(mouseX, mouseY, currFreq));
	}
}

function Beat(x, y, freq){
	this.x = x;
	this.y = y;//
	this.mode = true;
	this.freq = freq;
	this.rad = 0;
	this.echoArray = [];
	this.draw = function(barHeight, h, s, l){
		noFill();
		strokeWeight(100*(1/this.freq));
		stroke(h, s, l);
		if(barHeight > 0){
			if(this.freq <= 2){
				if(barHeight*width/1500 > 255)
					this.echoArray.push(new Echo(this.x, this.y, 0, h, s, l));
			}
			else{
				this.rad = barHeight*4/this.freq;
				if(this.freq >= 3 && barHeight > 230*width/1500)
					this.echoArray.push(new Echo(this.x, this.y, this.rad, h, s, l));
				ellipse(this.x, this.y, this.rad, this.rad);	
			}
			for(var e in this.echoArray){
				this.echoArray[e].draw();
				if(this.echoArray[e].o < 0)
					this.echoArray.splice(e, 1);
			}
		}	
		//TRIANGLE METHOD TENTATIVE
/*			fill(h,s,l);
		noStroke();
		textSize(10)
		text(this.freq, this.x, this.y);*/
		//this.o -= .02;
		//this.rad *= 1.05;
/*		else if(this.mode == false){
		//translate(mouseX, mouseY);
		//rotate(frameRate%360);
		triangle(	this.x - this.rad, this.x-(tan(30)*this.rad),
					this.y + this.rad, this.y-(tan(30)*this.rad),
					this.x, this.y+(this.rad/sin(60)));
		this.o -= .1;
		this.rad *= 1.04;
	}	*/
	};
}

function Echo(x, y, rad, h, s, l){
	this.x = x;
	this.y = y;
	this.rad = rad;
	this.h = h;
	this.s = s;
	this.l = l;
	this.o = 1;
	this.bass = false
	this.draw = function(){
		noFill();
		strokeWeight(10);
		stroke(this.h, this.s, this.l, this.o);
		ellipse(this.x, this.y, this.rad, this.rad);
		if(this.rad != 0 && this.bass == false){
			this.rad *= 1.1;
			this.o -= .125;
		}
		else{
			this.o -= .05
			this.bass = true;
			this.rad += 30;
		}		
	}
}

