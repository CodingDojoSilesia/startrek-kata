const MathSupport = require("../utils/mathSupport");
const Point = require("../utils/point");
const SpaceObject = require("../core/spaceObject");
const SpaceShip = require("../core/spaceShip");

class Galaxy {
    constructor(galaxyConfig) {
        this.config = galaxyConfig;
        this.SpaceObjects = this.generateObjects();
    }

    generateObjects() {
        let generatedObjects = [];

        let nofKlingons = this.config.KLINGON_SHIPS;
        let nofStarbases = this.config.STARBASES;
        let nofStars = this.config.STARS;

        const sectInGalaxy = this.config.QUADRANTS * this.config.SECTORS_IN_QUADRANT;
        MathSupport.randomUniques(0, sectInGalaxy - 1, nofKlingons + nofStarbases + nofStars).forEach(rs => {
            const quadrant = this.getQuadrantFromSectorNumber(rs);
            const sector = this.getSectorFromSectorNumber(rs);
            if (nofKlingons > 0) {
                generatedObjects.push(new SpaceShip(quadrant, sector, 600));
                nofKlingons--;
            } else if (nofStars > 0) {
                generatedObjects.push(new SpaceObject(quadrant, sector, "star"));
                nofStars--;
            } else {
                generatedObjects.push(new SpaceObject(quadrant, sector, "starbase"));
            }
        });
        return generatedObjects;
    }

    getQuadrantObjects(quadrant) {
        return this.SpaceObjects.filter(so => so.quadrant.x == quadrant.x && so.quadrant.y == quadrant.y);
    }

    getQuadrantFromSectorNumber(sectorNumber) {
        const sectInQuad = this.config.SECTORS_IN_QUADRANT;
        const nofQuad = this.config.QUADRANTS;
        let x = Math.floor(sectorNumber / Math.sqrt(nofQuad)) % Math.sqrt(sectInQuad);
        let y = Math.floor(sectorNumber / (Math.sqrt(nofQuad) * sectInQuad));
        return new Point(x, y);
    }

    getSectorFromSectorNumber(sectorNumber) {
        const sectInQuad = this.config.SECTORS_IN_QUADRANT;
        let x = sectorNumber % Math.sqrt(sectInQuad);
        let y = Math.floor(sectorNumber / sectInQuad) % Math.sqrt(sectInQuad);
        return new Point(x, y);
    }

    getSectorNumberFromPosition(quadrant, sector) {
        const sectInQuad = this.config.SECTORS_IN_QUADRANT;
        const nofQuad = this.config.QUADRANTS;
        return (
            quadrant.x * Math.sqrt(nofQuad) +
            quadrant.y * Math.sqrt(nofQuad) * sectInQuad +
            sector.x +
            sector.y * sectInQuad
        );
    }

    getGlobalPositionFromSectorNumber(sectorNumber) {
        const sectInQuad = this.config.SECTORS_IN_QUADRANT;
        const nofQuad = this.config.QUADRANTS;
        return new Point(sectorNumber % sectInQuad, Math.floor(sectorNumber / nofQuad));
    }

    shuffleQuadrant(quadrant) {
        let newRnds = MathSupport.randomUniques(
            0,
            this.config.SECTORS_IN_QUADRANT - 1,
            this.getQuadrantObjects(quadrant).length
        );
        let currentRnd = 0;
        this.SpaceObjects = this.SpaceObjects.map(so => {
            if(so.quadrant.x == quadrant.x && so.quadrant.y == quadrant.y){
                let newX = newRnds[currentRnd] % Math.sqrt(this.config.SECTORS_IN_QUADRANT);
                let newY = Math.floor(newRnds[currentRnd] / Math.sqrt(this.config.SECTORS_IN_QUADRANT));
                currentRnd++;
                so.setPosition(so.quadrant, new Point(newX, newY));
            }
            return so;
        });
    }
}

module.exports = Galaxy;
