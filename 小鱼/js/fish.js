var can1;
var can2;
var ctx1;
var ctx2;
var lastTime,deltaTime;
var now;
var pic=new Image();
var canWidth,canHeight;
var ane;
var fruit;
var fish1;
var mx=0,my=0;
var babyFish;
var babyTa=[];
var babyEy=[];
var babyBo=[];
var bigTail=[];
var bigEye=[];
var data;
var bodyOrg=[];
var bodyBlue=[];
var wave;
var halo;
var dust;
var dustPic=[];
document.body.onload=game;
function game() {
	// body...
	init();
	lastTime=Date.now();
	now=0;
	ganmeLoop();
}
function init(){
	can1=document.getElementById('canvas1');
	can2=document.getElementById('canvas2');
	ctx1=can1.getContext("2d");
	ctx2=can2.getContext('2d');
	pic.src="./img/background.jpg";
	canWidth=can1.width;
	canHeight=can1.height;
	ane=new aneObj();
	ane.init();
	fruit=new fruitObj();
	fruit.init();
	fish1=new fishObj();
	fish1.init();
	babyFish=new babyObj();
	babyFish.init();
	for(var i=0;i<8;i++){
		babyTa[i]=new Image();
		babyTa[i].src="./img/bigTail"+i+".png";
	}
	for(var i=0;i<2;i++){
		babyEy[i]=new Image();
		babyEy[i].src="./img/babyEye"+i+".png";
	}
	for(var i=0;i<20;i++){
		babyBo[i]=new Image();
		babyBo[i].src="./img/babyFade"+i+".png";
	}
	for(var i=0;i<8;i++){
		bigTail[i]=new Image();
		bigTail[i].src="./img/bigTail"+i+".png";
	}	
	for(var i=0;i<2;i++){
		bigEye[i]=new Image();
		bigEye[i].src="./img/bigEye"+i+".png";
	}
	data=new dataObj();
	for(var i=0;i<8;i++){
		bodyOrg[i]=new Image();
		bodyBlue[i]=new Image();
		bodyOrg[i].src="./img/bigSwim"+i+".png";
		bodyBlue[i].src="./img/bigSwimBlue"+i+".png";
	}
	wave=new waveObj();
	wave.init();
	halo=new haloObj();
	halo.init();
	dust=new dustObj();
	for( var i=0;i<7;i++){
			dustPic[i]=new Image();
			dustPic[i].src="./img/dust"+i+".png";
	}
	dust.init();
}
function ganmeLoop(){
	
	window.requestAnimFrame(ganmeLoop);
	can1.addEventListener("mousemove",onMouseMove,false);
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	if(deltaTime>40){
		deltaTime=40;
	}
	drawbackground();
	ane.draw();
	fruit.draw();
	fruitMonitor();
	ctx1.clearRect(0,0,canWidth,canHeight);
	fish1.draw();
	dead();
	babyFish.draw();
	babyFishcollsion();
	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}
function onMouseMove(e){
	if(!data.gameOver){
		mx=e.offsetX;
		my=e.offsetY;
	}
		
	}
function drawbackground(){
	// body...
	ctx2.drawImage(pic,0 ,0,canWidth,canHeight);
}
var aneObj=function () {
	// body...
	this.rootx=[];
	this.x=[];
	this.y=[];
	this.amp=[];
	this.alpha=0;
	
};
aneObj.prototype.num=50;
aneObj.prototype.init=function () {
	for(var i=0;i<this.num;i++){
		this.rootx[i]=i*16+Math.random()*20;
		this.y[i]=canHeight-250+Math.random()*50;
		this.amp[i]=Math.random()*50+80;
	}
};
aneObj.prototype.draw=function () {
	// body...
		this.alpha+=deltaTime*0.001;
		var len=Math.sin(this.alpha);
		ctx2.save();
		ctx2.globalAlpha=0.6;
		ctx2.lineWidth=20;
		ctx2.lineCap="round";
		ctx2.strokeStyle="#3b154e";
	for(var i=0;i<this.num;i++){
		this.x[i]=this.rootx[i]+len*this.amp[i];
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);
		ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.x[i],this.y[i]);
		ctx2.stroke();
	}
	ctx2.restore();
	
};
var fruitObj=function(){
	this.alive=[];
	this.x=[];
	this.y=[];
	this.l=[];
	this.number=[];
	this.speed=[];	
	this.fruitStype=[];
	this.orange=new Image();
	this.blue=new Image();
};
fruitObj.prototype.num=30;	
fruitObj.prototype.init=function(){
	for( var i=0;i<this.num;i++){
		this.x[i]=0;
		this.y[i]=0;
		this.speed[i]=Math.random()*0.01+0.001;
		this.number[i]=0;
		this.born(i);
	}
		this.orange.src="./img/fruit.png";
		this.blue.src="./img/blue.png";
};
fruitObj.prototype.draw=function () {
	// body...
for(var i=0;i<this.num;i++){
	if(this.alive[i]){
		if(this.fruitStype[i]=="blue"){
			var pic=this.blue;
		}else{
			var pic=this.orange;
		}
		if(this.l[i]<=10)
			{
				this.x[i]=ane.x[this.number[i]];
				this.y[i]=ane.y[this.number[i]];
			this.l[i]+=this.speed[i]*deltaTime;
			ctx2.drawImage(pic,this.x[i],this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
			}else{
			this.y[i]-=this.speed[i]*7*deltaTime;
			ctx2.drawImage(pic,this.x[i],this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
		}

		
			if(this.y[i]<10){
			this.alive[i]=false;	
			}
		}
		
	}
};
fruitObj.prototype.born=function(i){
	this.number[i]=Math.floor(Math.random()*ane.num);
	this.l[i]=0;
	this.alive[i]=true;
	var t=Math.random();
	if(t<0.2){
		this.fruitStype[i]="blue";
	}else{
		this.fruitStype[i]="orange";
	}
	
};
function fruitMonitor(){
	var num=0;
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]){
			num++;
		}
		if(num<15){
			sendFruit();
			return;
		}
	}
}
function sendFruit(){
	for (var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);
		}
	}
}
var fishObj=function(){
	this.x=0;
	this.y=0;
	this.angle=0;
	this.bigEye=new Image();
	this.bigBody=new Image();
};
fishObj.prototype.init=function(){
   	this.x=canWidth*0.5;
   	this.y=canHeight*0.5;
   	this.angle=0;
   	this.Tailtimer=0;
   	this.Tailcount=0;
   	this.Eyetimer=0;
   	this.Eyecount=0;
   	this.Eyeinter=1000;
   	this.Bodycount=0;
};
fishObj.prototype.draw=function(){
	this.x=lerpDistance(mx,this.x,0.99);
	this.y=lerpDistance(my,this.y,0.99);
	var deltaX=mx-this.x;
	var deltaY=my-this.y;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;
	this.angle=lerpAngle(beta,this.angle,0.9);
	this.Tailtimer+=deltaTime;
	if(this.Tailtimer>200){
		this.Tailcount=(this.Tailcount+1)%8;
		this.Tailtimer=this.Tailtimer%300;
	}
	this.Eyetimer+=deltaTime;
	if(this.Eyetimer>this.Eyeinter){
		this.Eyecount=(this.Eyecount+1)%2;
		this.Eyetimer=this.Eyetimer%this.Eyeinter;
		if(this.Eyecount==0){
			this.Eyeinter=Math.random()*1500+1500;
		}else{
			this.Eyeinter=200;
		}
	}
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	
	var count3=this.Bodycount;
	if(data.double==1){
		ctx1.drawImage(bodyOrg[count3],-bodyOrg[count3].width*0.5,-bodyOrg[count3].height*0.5);
	}else{
		ctx1.drawImage(bodyBlue[count3],-bodyBlue[count3].width*0.5,-bodyBlue[count3].height*0.5);
	}
	var count2=this.Eyecount;
	ctx1.drawImage(bigEye[count2],-bigEye[count2].width*0.5,-bigEye[count2].height*0.5);
	var count1=this.Tailcount;
	ctx1.drawImage(bigTail[count1],-bigTail[count1].width*0.5+30,-bigTail[count1].height*0.5);
	ctx1.restore();
};
function dead(){
	if(!data.gameOver){
		for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]){
			var l=calLength2(fruit.x[i], fruit.y[i], fish1.x, fish1.y);
			if(l<900){
				fruit.alive[i]=false;
				fish1.Bodycount++;
				if(fish1.Bodycount>7){
					fish1.Bodycount=7;
				}
				data.num++;
				if(fruit.fruitStype[i]=="blue"){
					data.double=2;
				}
				wave.born(fruit.x[i],fruit.y[i]);
			}
		}
	}
	}
	
}
var babyObj=function(){
	this.x=[];
	this.y=[];
	this.angle;
	this.babyEye=new Image();
	this.babyBody=new Image();
	this.Tailtimer=0;
	this.Tailcount=0;
	this.Eyetimer=0;
	this.Eyecount=0;
	this.Eyeinter=1000;
	this.Bodytimer=0;
	this.Bodycount=0;
};
babyObj.prototype.init=function(){
	this.x=canWidth*0.5-50;
	this.y=canHeight*0.5+50;
	this.angle=0;
};
babyObj.prototype.draw=function(){
	this.x=lerpDistance(fish1.x,this.x,0.99);
	this.y=lerpDistance(fish1.y,this.y,0.99);
	var deltaX=fish1.x-this.x;
	var deltaY=fish1.y-this.y;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;
	this.angle=lerpAngle(beta,this.angle,0.9);
	this.Tailtimer+=deltaTime;
	if(this.Tailtimer>50){
		this.Tailcount=(this.Tailcount+1)%8;
		this.Tailtimer=this.Tailtimer%50;
	}
	this.Eyetimer+=deltaTime;
	if(this.Eyetimer>this.Eyeinter){
		this.Eyecount=(this.Eyecount+1)%2;
		this.Eyetimer=this.Eyetimer%this.Eyeinter;
		if(this.Eyecount==0){
			this.Eyeinter=Math.random()*1500+1500;
		}else{
			this.Eyeinter=200;
		}
	}
	this.Bodytimer+=deltaTime;
	if(this.Bodytimer>500){
		this.Bodycount=this.Bodycount+1;
		this.Bodytimer=this.Bodytimer%500;
		if(this.Bodycount>19){
			this.Bodycount=19;
			data.gameOver=true;
		}
	}
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	var count1=this.Tailcount;
	ctx1.drawImage(babyTa[count1],-babyTa[count1].width*0.5+23,-babyTa[count1].height*0.5);
	var count2=this.Eyecount;
	var count3=this.Bodycount;
	ctx1.drawImage(babyBo[count3],-babyBo[count3].width*0.5,-babyBo[count3].height*0.5);
	ctx1.drawImage(babyEy[count2],-babyEy[count2].width*0.5,-babyEy[count2].height*0.5);
	ctx1.restore();

};
function babyFishcollsion(){
	if(!data.gameOver){
		if(data.num>0){
		var l=calLength2(fish1.x,fish1.y,babyFish.x,babyFish.y);
		if(l<900){	
			babyFish.Bodycount=0;
		fish1.Bodycount=0;
		data.addscore();
		halo.born(babyFish.x,babyFish.y);
		}
	}
	}
}
var dataObj=function(){
	this.num=0;
	this.double=1;
	this.score=0;
	this.gameOver=false;
	this.alpha=0;
};
dataObj.prototype.draw=function(){
	ctx1.save();
	ctx1.font="40px Georgia"
	ctx1.fillStyle="white";
	ctx1.textAlign="center";
	ctx1.shadowBlur="10";
	ctx1.shadowColor="white";
	ctx1.fillText("score "+this.score,canWidth*0.5,canHeight-20);
	if(this.gameOver){
		this.alpha+=deltaTime*0.0005;
		if(this.alpha>1){
			this.alpha=1;
		}
		ctx1.fillTextStyle="rgba(255,255,255,"+this.alpha+")";
		ctx1.fillText("GAME OVER",canWidth*0.5,canHeight*0.5);
	}
	ctx1.restore();
};
dataObj.prototype.addscore=function(){
	this.score+=this.num*100*this.double;
	this.num=0;
	this.double=1;
};
var waveObj=function(){
	this.x=[];
	this.y=[];
	this.r=[];
	this.alive=[];
};
waveObj.prototype.num=10;
waveObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;
		this.r[i]=10;
	}
};
waveObj.prototype.draw=function(){
	ctx1.save();
	ctx1.lineWidth=1;
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			this.r[i]+=deltaTime*0.1;
			if(this.r[i]>60){
				this.alive[i]=false;
				continue;
			}
			var alpha=1-this.r[i]/60;
			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);
			ctx1.closePath();
			ctx1.strokeStyle="rgba(155,255,25,"+alpha+")";
			ctx1.stroke();
		}
	}
	ctx1.restore();
};
waveObj.prototype.born=function(x,y){
	for(var i=0;i<this.num;i++){
		if(!this.alive[i]){
			this.alive[i]=true;
			this.r[i]=10;
			this.x[i]=x;
			this.y[i]=y;
			return;
		}
	}
};
var haloObj=function(){
	this.x=[];
	this.y=[];
	this.r=[];
	this.alive=[];
};
haloObj.prototype.num=10;
haloObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;
		this.r[i]=10;
	}
};
haloObj.prototype.draw=function(){
	ctx1.save();
	ctx1.lineWidth=2;	
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			this.r[i]+=deltaTime*0.1;
			if(this.r[i]>100){
				this.alive[i]=false;
				continue;
			}
			var alpha=1-this.r[i]/100;
			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);
			ctx1.closePath();
			ctx1.strokeStyle="rgba(135,455,135,"+alpha+")";
			ctx1.stroke();
		}
	}
	ctx1.restore();
};
haloObj.prototype.born=function(x,y){
	for(var i=0;i<this.num;i++){
		if(!this.alive[i]){
			this.alive[i]=true;
			this.r[i]=10;
			this.x[i]=x;
			this.y[i]=y;
			return;
		}
	}
};
var dustObj=function(){
	this.x=[];
	this.y=[];
	this.amp=[];
	this.alpha;
	this.no=[];
};
dustObj.prototype.num=30;
dustObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.x[i]=Math.random()*canWidth;
		this.y[i]=Math.random()*canHeight;
		this.amp[i]=20+Math.random()*15;
		this.no[i]=Math.floor(Math.random()*7);
	}
	this.alpha=0;
};
dustObj.prototype.draw=function(){
	this.alpha+=deltaTime*0.0008;
	var l=Math.sin(this.alpha);
	for(var i=0;i<this.num;i++){
		var no=this.no[i];
		ctx1.drawImage(dustPic[no],this.x[i]+l*this.amp[i],this.y[i]);
	}
};