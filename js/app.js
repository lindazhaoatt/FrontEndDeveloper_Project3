
var x_move = 101;   //distance moved pressing left or right arrow
var y_move = 83;    //distance moved pressing up or down arrow


var Game = function() {
    this.sprite = 'images/Heart.png';
    this.speed = 100;    //inital speed
    this.gameLevel = 1;   // starting level for the game, moves to next one everytime player reaches the water
    this.gameLevelMax = 1; //keep track record level of the session
    this.num_lives = 5;  //total number of lives 
}

//Draw game environment elements on the screenm e.g. game level
Game.prototype.render = function() {
    // Draw other game specific details like game level
        ctx.font="25px Verdana";
        ctx.fillStyle = "rgba(0, 0, 0, 2)";
        ctx.fillText("Lives left: " + this.num_lives, 280, 500 ); 
        ctx.fillText("Game Level: " + this.gameLevel, 20, 550 ); 
        ctx.fillText("Record Level: " + this.gameLevelMax, 280, 550 ); 

 
          for (var i = 0; i < this.num_lives; i++) {
 
            ctx.drawImage(Resources.get(this.sprite), 0 + i*50, 450);
    }

   if (this.num_lives < 1) { //game over!
        //ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.font = "bold 48px sans-serif";
        ctx.fillText('GAME OVER', 100, 100);

        ctx.fillStyle = "black";
        ctx.font = "25px sans-serif";
        ctx.fillText('Press Down Arrow to Continue.', 120, 250);

        this.speed = 0;
    }
}
 
Game.prototype.reset = function() {
    game.gameLevel = 1; //rset game lavel back to 1
    game.speed = 100;  //inital speed is 100
    game.num_lives--;
}


// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + game.speed*dt;
    this.y = this.y;

    if (this.x > 450 ) {
        this.x = Math.random()*100;  //bug always starts from the 1st cell on the left on the same row
    }

   // Check for collision between bugs and player 
    // Reset player to starting position when any of the bugs collides with the player
    if ((this.x - player.x <  50 && this.y - player.y < 50) && 
        (this.x - player.x > -50 && this.y - player.y > -50)) {
        player.reset();
        game.reset(); 
    }

    
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (game.speed ===0){
       this.x = 0;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    //load players' images to an array
    Player.playerImages = ['images/char-cat-girl.png','images/char-boy.png','images/char-horn-girl.png','images/char-pink-girl.png','images/char-princess-girl.png'];

    // random selecting player's image from 0 to 4
    this.sprite = Player.playerImages[Math.floor(Math.random() * 5)];
    this.x = x;
    this.y = y;
}

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Reset player position to starting point 
Player.prototype.reset = function() {
    // Default starting point for player, 
    // prefer to start always in middle of screen
    this.sprite = Player.playerImages[Math.floor(Math.random() * 5)]; // random selecting player's image from 0 to 4
    this.x = 202;
    this.y = 320;

 }

Player.prototype.handleInput = function(key) {
  if (!key) {
        return;
    }

  if (game.speed != 0) {
    if (key == "up") {
        if(this.y - 83<=-40 ){ 
        } 
        else {
            this.y = this.y - y_move} //move up
    }
    if (key == "down") {
        if(this.y > 300 ){ 
            this.y = 400;  
        } 
        else {
            this.y = this.y + y_move} //move down
    }
    if (key == "left") {
        if(this.x < 101 ){ 
            this.x = 0;  
        } 
        else {
            this.x = this.x - x_move} //move left
    }
    if (key == "right") {
        if(this.x  > 300){  
             this.x = 400; 
            } 
        else {
             this.x = this.x + x_move} //move right
    }


    if ((this.x - star.x <  50 && this.y - star.y < 50) && 
    (this.x - star.x > -50 && this.y - star.y > -50)) { //successful

        game.speed = game.speed + 25;  //increase speed
        game.gameLevel++; //increase game level by 1

        if (game.gameLevel>game.gameLevelMax) {
            game.gameLevelMax++; //reset history for the current player
        }
        this.y = 320; 
        star.x = Math.floor(Math.random() * 5) *101; 
    }
  }

   else {
    if (key == "down") { //start over
    game.speed = 100;    //inital speed
    game.gameLevel = 1;   // starting level for the game, moves to next one everytime player reaches the water
    game.gameLevelMax = 1; //keep track record level of the session
    game.num_lives = 5;  //total number of lives 

  }
}
}

var Star = function(x, y){
    this.x = x;
    this.y = y;
 
    this.sprite = 'images/Star.png';

 };

Star.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var Enemy1 = new Enemy(Math.random()*50, 60);
var Enemy2 = new Enemy(Math.random()*50, 145);
var Enemy3 = new Enemy(Math.random()*50, 230);

var allEnemies = [Enemy1, Enemy2, Enemy3];

var player = new Player (2 * 101, 4 * 80);

var star = new Star (Math.floor(Math.random() * 5) *101, 0*83);

var game = new Game();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


