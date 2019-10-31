const SpaceShip = require("../core/spaceShip");
const Point = require("../utils/point");
const mathSupport = require("../utils/mathSupport");
const Galaxy = require('./galaxy');

class Game {
    constructor(config) {
        this.gameConfig = config;
        this.player = new SpaceShip(new Point(3, 3), new Point(3, 3), config.MAX_POWER);
        this.galaxy = new Galaxy(config.GALAXY); 

        this.starDates = config.INITIAL_STARDATES;        
    }

    movePlayer(xOffset, yOffset) {
        const prevousSectorNumber = this.galaxy.getSectorNumberFromPosition(this.player.quadrant, this.player.sector);
        const prevousGlobalPos = this.galaxy.getGlobalPositionFromSectorNumber(prevousSectorNumber);
        if (
            prevousGlobalPos.x + xOffset >= 0 &&
            prevousGlobalPos.x + xOffset < 64 &&
            prevousGlobalPos.y + yOffset >= 0 &&
            prevousGlobalPos.y + yOffset < 64
        ) {
            const newSectorNumber = prevousSectorNumber + xOffset + yOffset * 64;

            const newQuadrant = this.galaxy.getQuadrantFromSectorNumber(newSectorNumber);
            const newSector = this.galaxy.getSectorFromSectorNumber(newSectorNumber);

            const currentGlobalPos = this.galaxy.getGlobalPositionFromSectorNumber(newSectorNumber);

            const distanceTraveled = mathSupport.cityBlockDistance(
                prevousGlobalPos.x,
                prevousGlobalPos.y,
                currentGlobalPos.x,
                currentGlobalPos.y
            );

            this.starDates -= mathSupport.cityBlockDistance(
                this.player.quadrant.x,
                this.player.quadrant.y,
                newQuadrant.x,
                newQuadrant.y
            );
            this.player.setPosition(newQuadrant, newSector);
            this.player.reducePower(distanceTraveled);
        } else console.log("You cannot leave the galaxy!");
    }
}

module.exports = Game;
