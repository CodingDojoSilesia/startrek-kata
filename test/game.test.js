const Game = require('../src/core/game');
const spaceObject = require('../src/core/spaceObject');

describe('Testing generateObject', () => {
    const config = {
        GALAXY: {
            QUADRANTS: 64,
            SECTORS_IN_QUADRANT: 64,
        },
        KLINGON_SHIPS: 7,
        STARBASES: 2,
        STARS: 20,
        MAX_POWER: 600,
        INITIAL_STARDATES: 30
    }
    const game = new Game(config);
    xit('Should return an array of spaceObjects', () => {
        const result = game.generateObjects();
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(29);
        result.forEach(el => expect(el).toBeInstanceOf(spaceObject))
    })
});