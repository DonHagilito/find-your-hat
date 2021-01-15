let player = {
    xPos: 0, 
    yPos: 0,

    setStartPos(myField){
        startPos = myField.getStartPos()
        this.xPos = startPos[0];
        this.yPos = startPos[1];
    },

    updatePos(char){
        switch(char){
            case 'w':
                this.xPos--;
                break;
            case 'a':
                this.yPos--;
                break;
            case 's':
                this.xPos++;
                break;
            case 'd':
                this.yPos++;
                break;
            default: 
            break;
        }
    }
}

module.exports = player;