//creating variables
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground;

//extracting constants
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
	//loading images
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
}

function setup() {
	//creating canvas
	createCanvas(800, 650);

	//fixing center of mass
	rectMode(CENTER);

	//creating an engine and a world
	engine = Engine.create();
	world = engine.world;

	//creating sprites
	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale=0.2;
	packageBody = Bodies.circle(width/2 , 80 , 10 , {restitution:0.7,friction:1,density:1, isStatic:true} );
	World.add(world, packageBody);

	helicopterSprite=createSprite(width/2, 90, 10,10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale=0.95;
	helicopterSprite.setCollider("rectangle",0,10,450,65);

	//creating a ground
	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255);
	ground = Bodies.rectangle(width/2, height-35, width+20, 30 , {desity:2,friction:2,isStatic:true} );
	World.add(world, ground);

	//setting fixed position values
	boxX=width/2-100;
	boxY=560;

	//creating red drop zone
	boxleftSprite=createSprite(boxX-40, boxY-30, 20,150);
	boxleftSprite.shapeColor=color(255,0,0);

	boxLeftBody = Bodies.rectangle(boxX-40, boxY-30, 60,150 , {desity:1,friction:1,isStatic:true} );
	World.add(world, boxLeftBody);

	boxBase=createSprite(boxX+100, boxY+40, 300,20);
	boxBase.shapeColor=color(255,0,0);

	boxBottomBody = Bodies.rectangle(boxX+100, boxY+45 , 300,60 , {desity:1,friction:1,isStatic:true} );
	World.add(world, boxBottomBody);
	
	boxrightSprite=createSprite(boxX+240 , boxY-40, 20,150);
	boxrightSprite.shapeColor=color(255,0,0);

	boxRightBody = Bodies.rectangle(boxX+240 , boxY-40, 60,150 , {desity:1,friction:1,isStatic:true} );
	World.add(world, boxRightBody);

	//runnning the engine
	Engine.run(engine);

}
function draw() {
	//fixing center of mass
	rectMode(CENTER);

	//setting background colour
	background(0); 

	//setting the position of the packageSprite as the position of the packageBody
	packageSprite.x= packageBody.position.x;
	packageSprite.y= packageBody.position.y;

	//creating edge sprites
	edges=createEdgeSprites();

	//preventing the helicopter and the package from going out of the canvas
	helicopterSprite.collide(edges);
	packageSprite.collide(edges);

	//mentioning function
	mission();

	//drawing sprites
	drawSprites();

}
//function for the movement of the helicopter and the package
function mission(){

	if(packageSprite.isTouching(helicopterSprite)){

		if(keyDown(LEFT_ARROW)){
			helicopterSprite.x=helicopterSprite.x-10;
			translation={x:-10,y:0};

		if(helicopterSprite.x>203.75){
			Matter.Body.translate(packageBody,translation);
		 }
		}
		else if(keyDown(RIGHT_ARROW)){
			helicopterSprite.x=helicopterSprite.x+10;
			translation={x:10,y:0};

		if(helicopterSprite.x<596.25){
			Matter.Body.translate(packageBody,translation);
		 }
		}
	}

	if(keyDown(DOWN_ARROW)){
		Matter.Body.setStatic(packageBody,false);
	}
}