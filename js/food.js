class Food{
    constructor(){
        this.foodStock = 0
        this.lastfed
        this.image = loadImage("images/Milk.png");
    }
     updatefoodStock(foodStock){
       this.foodStock = foodStock
     }
     
     getfedtime(lastfed){
      this.lastfed = lastfed
     }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock-1
        }
    }

    bedroom(){
        background(bedRoom,550,500);
    }

    garden(){
        background(garden,550,500)
    }

    washroom(){
        background(washRoom,550,500);
    }
      
    getfoodStock(){
     return this.foodStock
    }

     display(){
         var x = 80,y = 100
         imageMode(CENTER)
         image(this.image,720,220,70,70)
         
        

         if(this.foodStock!=0){
             for(var i=0;i<this.foodStock;i++){
                 if(i%10===0){
                   x = 80;
                   y = y+50;
                 }
                 image(this.image,x,y,50,50);
                 x = x+30;
             }
         }
     }

}



