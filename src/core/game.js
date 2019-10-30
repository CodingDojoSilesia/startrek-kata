const SpaceShip = require('../core/spaceShip');
const Point = require('../utils/point');

class Game {

    constructor(config){
        this.gameConfig = config;
        this.player = new SpaceShip(new Point(3, 3), new Point(3, 3), config.MAX_POWER);
        this.spaceObjects = this.generateObjects();
    }

    generateObjects(){
        let generatedObjects = [];
        let 
        return generatedObjects;
    }

}

module.exports = Game;