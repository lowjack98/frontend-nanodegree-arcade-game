// Enemies our player must avoid
/*
**The Enemy function, which initiates the Enemy by:
  Loading the image by setting this.sprite to the appropriate image in the image folder
  Setting the Enemy initial location
  Setting the Enemy speed
**The update method for the Enemy
  Updates the Enemy location
  Handles collision with the Player
** */
var Enemy = function(x) {
    // Variables applied to each of our instances go here,
    // setting negative x values makes the enemy appear to
    // start at different times.
    this.x = (Math.floor((Math.random() * 10) + 1)*10-100);
    //y values should be 65, 145, 225 (diff 80)
    //This sets them on one of the 3 y-axis blocks
    this.y = (Math.floor((Math.random() * 3) + 1))*80 - 15;
    this.speed = (Math.floor((Math.random() * 3) + 1))*200;
    // Set the sprite image for our enemies here
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;
    // reset the enemy and have it start over once it travels
    // off the right side of the game board
    if(this.x > 700){
      this.x = 0;
    }
    //check for collision
    if(this.y == player.y){
      if(this.x >= (player.x-80) && this.x <= (player.x+70)){
        alert("Sorry you Lose!");
        player.reset();
      }
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
/*
**The PLayer function, which initiates the Player by:
  Loading the image by setting this.sprite to the appropriate image in the image folder
  Setting the Player initial location
**The handleInput method for the Player
  Takes the key pressed and moves the player as needed
  It also checks to make sure the player does not move off the board
**The render method for the Player
  Draws the player on the screen.
**The reset method for the Player
  resets the player back to the starting position,
**The update method for the Player
  Check to see if the Player made it to the finish
** */
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 225+80*2;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.handleInput = function(dirKey) {
    console.log(dirKey);
    var deltax = 0;
    var deltay = 0;
    switch (dirKey) {
      case 'left':
        deltax = -100;
        break;
      case 'right':
        deltax = 100;
        break;
      case 'up':
        deltay = -80;
        break;
      case 'down':
        deltay = 80;
        break;
    }
    if((this.x + deltax) <= 400 && (this.x + deltax) >= 0){
      this.x = this.x + deltax;
    }
    // -15 to 385
    if((this.y + deltay) <= 385 && (this.y + deltay) >= -15){
      this.y = this.y + deltay;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 225+80*2;
};

Player.prototype.update = function(dt) {
  //console.log('player update ran');
  if(this.y == -15){
    alert("You Win!");
    this.reset();
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(0),new Enemy(0),new Enemy(0)];

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
