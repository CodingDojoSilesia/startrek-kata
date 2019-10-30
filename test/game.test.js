const Game = require('../src/core/game');
const SpaceObject = require('../src/core/spaceObject');
const Point = require('../src/utils/point');

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

describe('Test generateObject', () => {
    const game = new Game(config);
    it('Should return an array of SpaceObjects', () => {
        const result = game.generateObjects();
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(29);
        result.forEach(el => expect(el).toBeInstanceOf(SpaceObject))
    })
});

describe('Test movePlayer', () => {
    let config = {
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

    beforeEach(() => game.player.setPosition(new Point(3, 3), new Point(3, 3)));

    it('Should not move player on vector 0, 0', () => {
        game.movePlayer(0, 0);
        expected = {
            quadrant: {
                x: 3,
                y: 3,
            },
            sector: {
                x: 3,
                y: 3
            }
        }

        expect(game.player.getPosition()).toEqual(expected);
    });

    it('Should move player on proper vector', () =>{
        const cases = [
            [[2, 0], [3, 3], [5, 3]],
            [[-2, 0], [3, 3], [1, 3]],
            [[0, 2], [3, 3], [3, 5]],
            [[0, -2], [3, 3], [3, 1]]
        ];
        cases.forEach(c => {
            const expected = {
                quadrant: {
                    x: c[1][0],
                    y: c[1][1],
                },
                sector: {
                    x: c[2][0],
                    y: c[2][1]
                }
            };
            game.movePlayer(c[0][0], c[0][1]);
            expect(game.player.getPosition()).toEqual(expected);
            game.player.setPosition(new Point(3, 3), new Point(3, 3));
        })
    })
});

describe('Test hasPlayerCollided', () => {
    const game = new Game(config);
    it('Should return true if player collided', () => {
        expect(game.hasPlayerCollided(new Point(3, 3), new Point(3, 3))).toBe(true);
    });
    it('Should return false if player not collided', () => {
        expect(game.hasPlayerCollided(new Point(3, 3), new Point(3, 4))).toBe(false);
    });
});