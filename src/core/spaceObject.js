class SpaceObject {
    constructor(quadrant, sector, type){
        this.type = type;
        this.setPosition(quadrant, sector);
        this.isDestroyed = false;
    }

    setPosition(quadrant, sector){
        this.quadrant = quadrant;
        this.sector = sector;
    }
    
    getPosition(){
        return {
            quadrant: this.quadrant,
            sector: this.sector   
        }
    }
}

module.exports = SpaceObject;