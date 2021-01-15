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

  static isFieldSolvable(field){
    const tempField = new Field(field); // making a new Field class instance to get access to get start pos
    let reachableCoords = []
    reachableCoords.push(tempField.getStartPos());
    
    
    function isTilePosValid(pos){
      if (pos[0] > field.length-1 || pos[0] < 0){ //Check if out of bounds X-axis
        return false;
      }
      else if (pos[1] > field[0].length-1 || pos[1] < 0){ //Checks if out of bounds Y-axis
        return false;
      }
      else if (reachableCoords.some(element => element[0] === pos[0] && element[1] === pos[1])){ //If it is logged as reachable coordinate, it is not valid. Return false. (checks if element-array is same as pos-array)
        return false;
      }
      else if (field[pos[0]][pos[1]] === hole){ //If the pos is a hole in the field, it is not valid, return false.
        return false;
      }
      else{ // If it is neither of the above, it is a valid tile to check! return true!
        return true;
      }
    }

    function isHatElseLogPos(tilePos){
      if(isTilePosValid(tilePos)){ 
        if (field[tilePos[0]][tilePos[1]] === hat){  // if its a hat the maze is solveable! return true!
          return true;
        } 
        else{ //if its not a hat but a valid tile-pos, it must be a reachable tile, so we log it as that to check surrounding tiles later.
          reachableCoords.push([tilePos[0], tilePos[1]]); 
          return false;
        }
      }
    }

    for (let elementIndex = 0; elementIndex < reachableCoords.length; elementIndex++){ //for each coordinate the player can reach we check the following.
      let pos = reachableCoords[elementIndex]; //Save the reachable pos. We are going to check the four tiles around this pos.
      for(let i = 0; i<4 ; i++){
        switch(i){
          case 0: //check x-1. Same as pressing w in the game.
            if (isHatElseLogPos([pos[0]-1, pos[1]]) === true){
              return true;
            }
            break;
          case 1: //check y-1. Same as pressing a in the game. 
            if (isHatElseLogPos([pos[0], pos[1]-1]) === true){
              return true;
            }
            break;
          case 2: //check x+1. Same as pressing s in the game. 
            if (isHatElseLogPos([pos[0]+1, pos[1]]) === true){
              return true;
            }
            break;
          case 3: //check y+1. Same as pressing w in the game. 
            if (isHatElseLogPos([pos[0], pos[1]+1]) === true){
              return true;
            }
            break;
        }
      }
    }
    return false //If we have gone through all the reachable coordinates without finding a hat, it is not solvable. Return false!
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
      //Take a random spots thats not a hole or hat and place player. Aslo save start pos of player. 
      do{
        randomX = Math.floor(Math.random()*tempField.length); 
        randomY = Math.floor(Math.floor(Math.random()*tempField[0].length));
        if (tempField[randomX][randomY] != hole && tempField[randomX][randomY] != hat){
          tempField[randomX][randomY] = pathCharacter;
          playerPlaced = true;
        }
      }while(playerPlaced === false);

      if (Field.isFieldSolvable(tempField)){ //If the field is solveable we can return it to the game. 
        return tempField;
      }
      else{ //If the field is not solvable, we call the generateField function again to try a new field. Until someone passes. This might loop forever though if too high hole-percentage is chosen..
        return Field.generateField(height, width, percentHole)
      }
  }
}
  
  
module.exports = Field; 