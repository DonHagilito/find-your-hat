

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field){
      this.field = field;
    }
  
  print(){
      this.field.forEach(row =>{
        console.log(row.join(''));
      })  
  }

  metWinCondition(player){
    //If the coordinates of the player is outside the map it should end. 
    if (player.xPos > this.field.length-1 || player.xPos < 0){
      return [true, 'Whoopsie! You went outside of the map. You lost.']
    }
    else if (player.yPos > this.field[0].length-1 || player.yPos < 0){
      return [true, 'Whoopsie! You went outside of the map. You lost.']
    }
    //Get the character of the current tile.
    const currTile = this.field[player.xPos][player.yPos];
    //Checks wether the player moved to a tile with a hat, hole or a field.
    switch (currTile){
      case hat:
        return [true, 'You found the Hat! You Won!'];
      case hole:
        return [true, 'Darn it! You fell into a hole. You lost.']
      case fieldCharacter:
        return [false, ''];
      default: //Player met his own path
        return [false, ''];
    }
  }

  updatePath(player){
    this.field[player.xPos][player.yPos] = pathCharacter;
  }

  getStartPos(){
    for (let xPos = 0; xPos < this.field.length; xPos++){
      for (let yPos = 0; yPos < this.field[0].length; yPos++){
        if (this.field[xPos][yPos] === pathCharacter){
          return [xPos, yPos];
        }
      }
    }
  }

  static generateField(height, width, percentHole){
      let tempField = [];
      //Loop through the hole new board and give each tile fieldCharacter or hole, based on provided odds. 
      for (let xPos = 0; xPos < height; xPos++){
        tempField.push([]);
        for (let yPos = 0; yPos < width; yPos++){
          tempField[xPos].push(Math.floor(Math.random()*100) > percentHole ? fieldCharacter : hole);
        }
      }
      //Take a random spot thats not a hole and place hat.
      let randomX;
      let randomY;
      let hatPlaced = false;
      let playerPlaced = false;
      do{
        randomX = Math.floor(Math.random()*tempField.length); 
        randomY = Math.floor(Math.floor(Math.random()*tempField[0].length));
        if (tempField[randomX][randomY] != hole){
          tempField[randomX][randomY] = hat;
          hatPlaced = true;
        }
      }while(hatPlaced === false);
      //Take a random spots thats not a hole or hat and place player. Aslo save start pos of player
      do{
        randomX = Math.floor(Math.random()*tempField.length); 
        randomY = Math.floor(Math.floor(Math.random()*tempField[0].length));
        if (tempField[randomX][randomY] != hole && tempField[randomX][randomY] != hat){
          tempField[randomX][randomY] = pathCharacter;
          playerPlaced = true;
        }
      }while(playerPlaced === false);
      return tempField;
  }

    
}
  
  
module.exports = Field; 