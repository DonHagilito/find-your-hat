const Field = require('./field.js');
const player = require('./player.js');
const prompt = require('prompt-sync')({sigint: true});
//Game variables
let input = '';
let gameFinished = [false, ''];

//Create a new field from Field class with dimensions. 
const myField = new Field(Field.generateField(20, 20, 30));
//Set the players startpoint according to generated field.
player.setStartPos(myField);

//Game loop
while(gameFinished[0] === false){
    console.clear();
    myField.print();
    
    //Get user input and update player position
    input = prompt("What's your next move? (You play with WASD): ");
    player.updatePos(input.toLowerCase());

    //Gets an array with a value if game is finished and a statement why it happend. 
    gameFinished = myField.metWinCondition(player);
    //Checks if the game is finished. If yes log a message that the game is finished and why and finish the loop.
    if (gameFinished[0]) {
        console.log(gameFinished[1]);
    } else{     //Else, clear the console, update path in the field and go to the next loop.
        console.clear();
        myField.updatePath(player);
    }
}