function init()
{  
   canvas=document.getElementById('mycanvas');
   W=H=canvas.width=canvas.height=1000;
   pen=canvas.getContext('2d');
   cs=66;
   food=getRandomFood();
   game_over=false;
   flag=0;
   food_img=new Image();
   food_img.src="assets/food.png";
   trophy=new Image();
   trophy.src="assets/trophy.png";
   score=0;
   snake={
    init_length:5,
    color:"blue",
    cells:[],
    direction:"right",
    createSnake:function()
    {
       for(var i=this.init_length;i>0;i--)
       {
           this.cells.push({x:i,y:0});
       }
    },
    drawSnake:function()
    {  for(var i=0;i<this.cells.length;i++){
        pen.fillStyle=this.color;
        pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
    }
    },
    updateSnake:function(){

      
     
      var headX=this.cells[0].x;
      var headY=this.cells[0].y;
    
      if(headX==food.x && headY==food.y)
      {
          food=getRandomFood();
          score++;
      }
      else{
        this.cells.pop();
      }
      var nextX,nextY;
      if(snake.direction=="right"){
      nextX=headX+1;
      nextY=headY;}
      else if(snake.direction=="left")
      {
      nextX=headX-1;
      nextY=headY;
      }
      else if(snake.direction=="up")
      {
          nextX=headX;
          nextY=headY-1;
      }
     else{
        nextX=headX;
        nextY=headY+1;
     }
      this.cells.unshift({x:nextX,y:nextY});
      var last_x=Math.round(W/cs);
      var last_y=Math.round(H/cs);
      for(var i=1;i<this.init_length+score;i++)
      {
          if(this.cells[0].x==this.cells[i].x && this.cells[0].y==this.cells[i].y)
          {
              flag=1;
              break;
          }
      }
      if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x>last_x || this.cells[0].y>last_y || flag==1)
      {
          game_over=true;
      }
    
    },
    //event listener


   };
   snake.createSnake();
   function keyPressed(e){
      if(e.key=="ArrowRight")
      {
          snake.direction="right";
      }
      else if(e.key=="ArrowLeft")
      {
          snake.direction="left";
      }
      else if(e.key=="ArrowUp")
      {
          snake.direction="up";
      }
      else {
          snake.direction="down";
      }
   }
   document.addEventListener('keydown',keyPressed);
}
function draw()
{  pen.clearRect(0,0,W,H);
   snake.drawSnake();
   pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
   pen.drawImage(trophy,10,0);
   pen.fillStyle="#d4522a";
   pen.font="30px Roboto";
   pen.fillText(score,50,50);
   
}
function update()
{
   snake.updateSnake();
}
function getRandomFood()
{
    var foodX=Math.round((Math.random()*(W-cs)/cs));
    var foodY=Math.round((Math.random()*(H-cs)/cs));
    var food={
        x:foodX,
        y:foodY,
        checkFood:function(){
        for(var i=0;i<init_length+score;i++)
        {
            if(x==snake.cells[i].x && y==snake.cells[i].y)
            {
             x=Math.round((Math.random()*(W-cs)/cs));
             y=Math.round((Math.random()*(H-cs)/cs));
             break;
            }
        }
    }
    }
  return food;
}
function gameloop()
{
    if(game_over==true)
    {
        clearInterval(f);
        alert("Game Over");
        return;
    }
    draw();
    update();

}
init();
var f=setInterval(gameloop,100);