const SpaceShip = require("../core/spaceShip");
const SpaceObject = require("../core/spaceObject");
const Point = require("../utils/point");
const MathSupport = require("../utils/mathSupport");

class Game {
    constructor(config) {
        this.gameConfig = config;
        this.player = new SpaceShip(new Point(3, 3), new Point(3, 3), config.MAX_POWER);
        this.spaceObjects = this.generateObjects();
        this.starDates = config.INITIAL_STARDATES;
    }

    generateObjects() {
        let generatedObjects = [];
        let nofKlingons = this.gameConfig.KLINGON_SHIPS;
        let nofStarbases = this.gameConfig.STARBASES;
        let nofStars = this.gameConfig.STARS;
        let randomSectors = MathSupport.randomUniques(0, 4095, nofKlingons + nofStarbases + nofStars);
        randomSectors.forEach(rs => {
            const quadrant = MathSupport.getQuadrantFromSectorNumber(rs);
            const sector = MathSupport.getSectorFromSectorNumber(rs);
            if (nofKlingons > 0) {
                generatedObjects.push(new SpaceShip(quadrant, sector, 600));
            } else if (nofStars > 0) {
                generatedObjects.push(new SpaceObject(quadrant, sector, "space"));
            } else {
                generatedObjects.push(new SpaceObject(quadrant, sector, "spacebase"));
            }
        });
        return generatedObjects;
    }

    hasPlayerCollided(quadrant, sector) {
        if (
            this.player.quadrant.x == quadrant.x &&
            this.player.quadrant.y == quadrant.y &&
            this.player.sector.x == sector.x &&
            this.player.sector.y == sector.y
        )
            return true;
        else return false;
    }

    movePlayer(xOffset, yOffset) {
        const prevousSectorNumber = MathSupport.getSectorNumberFromPosition(this.player.quadrant, this.player.sector);
        const prevousGlobalPos = MathSupport.getGlobalPositionFromSectorNumber(prevousSectorNumber);
        if (
            prevousGlobalPos.x + xOffset > 0 &&
            prevousGlobalPos.x + xOffset < 64 &&
            prevousGlobalPos.x + yOffset > 0 &&
            prevousGlobalPos.y + yOffset < 64
        ) {
            const newSectorNumber = prevousSectorNumber + xOffset + yOffset * 64;

            const newQuadrant = MathSupport.getQuadrantFromSectorNumber(newSectorNumber);
            const newSector = MathSupport.getSectorFromSectorNumber(newSectorNumber);

            const currentGlobalPos = MathSupport.getGlobalPositionFromSectorNumber(newSectorNumber);

            const distanceTraveled = MathSupport.cityBlockDistance(
                prevousGlobalPos.x,
                prevousGlobalPos.y,
                currentGlobalPos.x,
                currentGlobalPos.y
            );

            this.starDates -= MathSupport.cityBlockDistance(
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
