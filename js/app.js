var changeX = 100;                              //variable representing player displacement along x-axis.

// Enemies our player must avoid
class Enemy {                                   //Class representing qualities and values shared by all enemies.
  constructor(x, y, speed) {                    //Constructor funtion: holds parameters which must be supplied at instantiation.
    this.x = x;                                 // Enemy x-axis property
    this.y = y;                                 // Enemy y-axis property
    this.speed = speed;                         // Enemy speed property
    this.sprite = 'images/enemy-bug.png';       // png image used for enemy characters
  }

  update(dt) {                                  //Function updating the position of all enemy characters.
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
      if (this.x > 505) {                     //Check against enemy postion at right edge of game board.
          this.x = 0;                         //If enmy reaches right end of board poisiton is reset to left edge of board.
      } else {                                //Else enemy has not reached the right edge of board.
          this.x = this.x + this.speed * dt;  //Enemy position is updated based on speed parameter and dt variable.
      };
      //following if statement checks if the player character is within range of any enemy character constituting a collision
      if (((this.x) >= (player.x - 75)) && ((this.x) <= (player.x + 75)) && (this.y +50 >= player.y) && (this.y - 50 <= player.y)) {
        player.x = 202;                       //Player x-axis position is reset to start
        player.y = 385;                       //Player y-axis position is reset to start
      }
  };

    // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  //Funciton draws and creates all enemy characters
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {                                  //Class represnting qualities and values of the player character
  constructor() {                               //Constructor funtion: Parameters are instantiated directly as properties.
    this.x = 202;                               //Initial x-axis position of Player.
    this.y = 385;                               //Initial y-axis position of Player.
    this.sprite = 'images/char-boy.png';        //Player character image.
    this.pressedKey = "";                       //Empty string value for key prassed to move character.  Value changes at key press.
  }

  update() {                                    //function updating posiiton of player character at key press.
    if (this.y <= 30) {                         //Checks if character is at top of screen in water tiles.
        window.alert("Game Over You Win");      //Message the player has won the game if player reaches the water tiles.
        this.x = 202;                           //Player x position reset to start point if game is won.
        this.y = 385;                           //Player y position reset to start point if game is won.
    }

    if(this.pressedKey === 'left') {            //Was left arrow key pressed?
      if(this.x <= 2) {                         //Is the palyer character at the left edge of the game board?
        this.x = this.x                         //If yes the player remains in same location.
      } else {                                  //Player is not at left edge of game board.
          this.x = this.x - changeX;            //Player x axis position is updated toward left edge of game board.
      }
    } else if(this.pressedKey === 'right') {    //Was Right arrow key pressed?
        if (this.x >= 402) {                    //Is the player character at the Rigth edge of the game board?
          this.x = this.x;                      //If yes the player remains in the same location.
        } else {                                //Player is not at the Right edge of the game board.
          this.x = this.x + changeX;            //Player x axis position is updated toward Right edge of game board.
        }
    } else if(this.pressedKey === 'up') {       //Was the Up arrow pressed?
        if (this.y <= 30) {                     //Is the Player on a water tile?
          this.y = this.y;                      //If yes  the player y position is not updated.  Also the win message is presented.
        } else if (this.y == 385) {             //Remaining checks move player to center of playable squares vertically.
            this.y = 285;                       //Moves up to second grass row.
        } else if (this.y == 285) {
            this.y = 225;                       //Moves up to 1st street row.
        } else if (this.y == 225) {
            this.y = 145;                       //Moves up to 2nd street row.
        } else if (this.y == 145) {
            this.y = 65;                        //Moves up to 3rd street row.
        } else if (this.y == 65) {
            this.y = -12;                       //Moves beyond win requirement onto watter tile.
        }
    } else if (this.pressedKey === 'down') {    //Was the down arrow pressed?
        if (this.y >= 385) {                    //Is the Player on in the 1st row of grass tiles?
          this.y = this.y;                      //If yes player is at lowest playable row and y position is not update.
        } else if (this.y == -12) {             //Included for consistency.  This is waster tile and player would win.
            this.y = 65;                        //Although player is auto reset at win should later code ajustments occur this will be the move toward 3rd, top street row.
        } else if (this.y == 65) {              //Is player on 3rd, top most, street row?
            this.y = 145;                       //Updates y position to 2nd, middle, street row.
        } else if (this.y == 145) {             //Is player on 2nd, middle, street row?
            this.y = 225;                       //Updates y positio to 1st, lowest, street row.
        } else if (this.y == 225) {             //Is player on 1st, lowest, street row?
            this.y = 285;                       //Updates position to 2nd, upper, row of grass.
        } else if (this.y == 285) {             //Is player on 2nd, upper, row of grass?
            this.y = 385;                       //Updates position to 1st, lower, row of grass.
        }
    }
      this.pressedKey = "";                     //Resets the value of pressed key to a blank string.
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  //Function creates Player character.
  }

  handleInput(directionButton) {                //Function takes values from allowedKeys and assigns them to pressedKey.
    this.pressedKey = directionButton;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [new Enemy(0, 225, 92), new Enemy(0, 145, 55), new Enemy(0, 65, 18)];    //Instantiation of new bugs.
const player = new Player();                                                                //Instantiation of Player character.

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {  //Event listener listening for key up events on allowedKeys object
    var allowedKeys = {
        37: 'left',       //Left arrow key
        38: 'up',         //Up arrow key
        39: 'right',      //Right arrow key
        40: 'down'        //Down arrow key
    };

    player.handleInput(allowedKeys[e.keyCode]);   //Links event listener to handleInput funciton.
});
