var database,foodStock;
var position,lastfed;
var dog,dogHappy,dogImg,feedDog;
var gameState = 0;
var readState
var bedRoom,washRoom,garden;
var updateCount;
var currentTime;
var lastFed;

function preload()
{
  dogHappy = loadImage("images/dogImg1.png");
  dogImg = loadImage("images/dogImg.png");
  bedRoom = loadImage("img/BedRoom.png")
  washRoom = loadImage("img/WashRoom.png")
  garden = loadImage("img/Garden.png")
  
}

function setup() {
  createCanvas(1000, 400);
  database = firebase.database();
  dog = createSprite(800,200,160,150);
  dog.addImage(dogImg)
  dog.scale = 0
  database = firebase.database()
  foodObj = new Food()
  foodStock = database.ref("food")
  foodStock.on("value",readStock)
  feed = createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  addFood = createButton("add food")
  addFood.position(800,95)
  addFood.mousePressed(addfoods)
  currentTime = hour();
}


function draw() {  
  background("red")
  foodObj.display()
  var fedtime = database.ref("feedtime")
  fedtime.on("value",function(data){
    lastfed = data.val();
  })
  fill(255,255,254)
  textSize(15)
  if(lastfed>=12){
    text("Last Feed"+ lastfed%12 + "PM",350,30)
  }else if(lastfed = 0){
     text("Last Feed : 12 AM",350,30)
  }else{
    text("Last Feed :"+ lastfed +"AM",350,30)
  }
  drawSprites();
  
  getState()
  readState = database.ref('gameState')
  readState.on("value",function(data){
  gameState = data.val();
  })

  if(gameState!="Hungry"){
  
    addFood.hide();
    dog.remove();
    }else{
      
      addFood.show();
      dog.addImage(sadDog);
    }
  
    if(currentTime===(lastFed+1)){
      update("playing")
      foodObj.garden()
   }else if(currentTime===(lastFed + 2)){
      update("sleeping")
      foodObj.bedroom()
   }else if(currentTime>(lastFed + 2) && currentTime<=(lastFed + 4)){
      update("bathing")
      foodObj.washRoom()
   }else {
    update("Hungry");
    foodObj.display();
   }

  
  }
  



function readStock(data){
  foods = data.val();
  foodObj.updateFoodStock(foods)
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}

  
  

  function feedDog(){
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
    database.ref('/').update({
      food : foodObj.getFoodStock(),
      feedTime: hour()
    })
  }



