const MathSupport = require("../utils/mathSupport");
const Point = require("../utils/point");
const SpaceObject = require("../core/spaceObject");
const SpaceShip = require("../core/spaceShip");

class Galaxy {
    constructor(galaxyConfig) {
        this.config = galaxyConfig;
        this.SpaceObjects = this.generateObjects();
    }

    getSurroundingQuadrantsPos(currentQuadrant){
        let surroundingQuadrants = [];
        for(let i = 0; i < 3; i++){
            surroundingQuadrants.push([]);
            for(let j = 0; j < 3; j++){
                let x = currentQuadrant.x - 1 + j;
                let y = currentQuadrant.y - 1 + i;
                if (MathSupport.inRange(x, 0, Math.sqrt(this.config.QUADRANTS) - 1) && MathSupport.inRange(y, 0, Math.sqrt(this.config.QUADRANTS) - 1)){
                    surroundingQuadrants[i].push(new Point(x, y));
                }
            }
        };
        return surroundingQuadrants.filter(el => el.length > 0);
    }

    getRemainingKlingons(){
        return this.SpaceObjects.filter(so => so.type == 'ship').length;
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
        return this.SpaceObjects.filter(so => MathSupport.hasCollided(so.quadrant, quadrant));
    }

    getQuadrantFromSectorNumber(sectorNumber) {
        const sectInQuad = this.config.SECTORS_IN_QUADRANT;
        const nofQuad = this.config.QUADRANTS;
        let y = Math.floor(sectorNumber / (Math.sqrt(nofQuad) * sectInQuad));
        let x = Math.floor(sectorNumber / Math.sqrt(nofQuad)) % Math.sqrt(sectInQuad);
        return new Point(x, y);
    }

    getSectorFromSectorNumber(sectorNumber) {
        const sectInQuad = this.config.SECTORS_IN_QUADRANT;
        let y = Math.floor(sectorNumber / sectInQuad) % Math.sqrt(sectInQuad);
        let x = sectorNumber % Math.sqrt(sectInQuad);
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

    getSurrouningSectors(sector){
        return [
            new Point(sector.x - 1, sector.y),
            new Point(sector.x, sector.y - 1),
            new Point(sector.x + 1, sector.y),
            new Point(sector.x, sector.y + 1)
        ]
    }
}

module.exports = Galaxy;
