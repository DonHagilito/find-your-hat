const prompt = require('prompt-sync')({sigint: true});

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
  
    static generateField(height, width, percentHoles){}
  
  }
  
  
module.export = Field; 