//Create variables here
var happydog,dogimage,dog,database, foodS,foodstock;
var no_of_bottles;

var feeddog, addfood;
var fedTime, lastFed, foodobj
function preload()
{
  //load images here
  happyDog= loadImage("happydog.png");
  dogimage= loadImage("Dog.png");

}

function setup() {
	createCanvas(1000, 400);
  dog= createSprite(800,200,150,150);
  
  dog.addImage(dogimage);
  dog.scale=0.15;

  database=firebase.database();
 
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodobj = new Food();
  
  
  feed= createButton ("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feeddog);

  addFood= createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)


}
function readPosition(data){
  no_of_bottles= data.val();
  console.log(no_of_bottles)
  
}

function draw() {  
  
  background(rgb (46, 139, 87));
  foodobj.display();
  fill ("pink");
  fedTime = database.ref ('FeedTime');
  fedTime.on ("value", function(data){
    lastFed= data.val ();
  })
  drawSprites();
  if (lastFed>=12){
    text("last feed: "+lastFed%12 + " PM",350,30)
  }
  else if (lastFed==0){
    text ("last fed: 12 AM",350,30)
  }
  else {
    text ("last feed : "+lastFed + "AM", 350,30)
  }
 
  
  

}

function readStock(data){
  foodS=data.val();
  foodobj.updateFoodStock(foodS);
}

function addFoods ()

{
  foodS++;
  database.ref('/').update({
    Food :foodS
  })
}

function feeddog(){
  dog.addImage(happyDog);
  foodobj.updateFoodStock(foodobj.getFoodStock()-1);
  database.ref ('/').update ({
    Food :foodobj.getFoodStock (),
    FeedTime :hour ()
  })

}