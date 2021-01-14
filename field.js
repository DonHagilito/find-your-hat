

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
      const currTile = this.field[player.yPos][player.xPos];
      //Checks wether the player moved to a tile with a hat, hole, a field or outside of the map.
    switch (currTile){
      case hat:
        console.log('You found the Hat! You Won!');
        return true;
      case hole:
        console.log('Darn it! You fell into a hole. You lost.');
        return true;
      case fieldCharacter:
        return false;
      default: //If the current tile is outside the map (undefined), the game should end
        console.log('Whoopsie! You went outside of the map. You lost');
        return true;
    }
  }
    static generateField(height, width, percentHoles){}
  
}
  
  
module.exports = Field; 