//Create variables here
var dog,happyDog,database,foodS,foodStock,dogImg1

function preload()
{
	//load images here
  dogImg1 = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
 
  
}

function setup() {
	createCanvas(500, 500);
  
  database = firebase.database();
  
  dog = createSprite(200,300,150,150);
  dog.addImage(dogImg1);
  dog.scale = 0.15;
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);
}

function draw() {  
  background(46,139,87);
  
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  
  drawSprites();
  
  fill(255,255,254)
  stroke("black");
  text("food remaining: "+foodS,170,200);
  //add styles here
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,400);
}
  
function readStock(data)  {
   foodS= data.val();
}

function writeStock(x)  {
  if(x<=0) {
    x=0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}