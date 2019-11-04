const Game = require("../src/core/game");
const SpaceObject = require("../src/core/spaceObject");
const SpaceShip = require('../src/core/spaceShip');
const Point = require("../src/utils/point");

const config = {
    GALAXY: {
        QUADRANTS: 64,
        SECTORS_IN_QUADRANT: 64
    },
    KLINGON_SHIPS: 7,
    STARBASES: 2,
    STARS: 20,
    MAX_POWER: 600,
    INITIAL_STARDATES: 30
};

let game = new Game(config);

beforeEach(() => game = new Game(config));

describe("Test construtor", () => {
    it('Should create player', () => {
        expect(game.player).toBeInstanceOf(SpaceShip);
        expect(game.player.power).toBe(600);
        expect(game.player.quadrant).toEqual(new Point(3, 3));
        expect(game.player.sector).toEqual(new Point(3, 3));
    });
    it('Should generate known galaxy filled with ? sumbols', () => {
        expect(game.knownGalaxy).toBeInstanceOf(Array);
        expect(game.knownGalaxy.length).toBe(8);
        game.knownGalaxy.forEach(row => {
            expect(row).toBeInstanceOf(Array);
            expect(row.length).toBe(8);
            row.forEach(el => expect(el).toEqual(['?', '?', '?']));
        })
    });
});

describe("Test movePlayer", () => {
    beforeEach(() => {
        game.player.setPosition(new Point(3, 3), new Point(3, 3));
        game.player.power = 600;
    });

    it("Should not move player on vector 0, 0", () => {
        game.movePlayer(0, 0);
        expected = {
            quadrant: {
                x: 3,
                y: 3
            },
            sector: {
                x: 3,
                y: 3
            }
        };

        expect(game.player.getPosition()).toEqual(expected);
    });

    it("Should move player on proper vector", () => {
        const cases = [
            [[-27, -27], [0, 0], [0, 0]],
            [[-27, 0], [0, 3], [0, 3]],
            [[-27, 36], [0, 7], [0, 7]],
            [[36, 36], [7, 7], [7, 7]],
            [[0, 0], [3, 3], [3, 3]],
            [[2, 0], [3, 3], [5, 3]],
            [[-2, 0], [3, 3], [1, 3]],
            [[0, 2], [3, 3], [3, 5]],
            [[0, -2], [3, 3], [3, 1]]
        ];
        cases.forEach(c => {
            const expected = {
                quadrant: {
                    x: c[1][0],
                    y: c[1][1]
                },
                sector: {
                    x: c[2][0],
                    y: c[2][1]
                }
            };
            game.movePlayer(c[0][0], c[0][1]);
            expect(game.player.getPosition()).toEqual(expected);
            game.player.setPosition(new Point(3, 3), new Point(3, 3));
        });
    });

    it("Should not move player if tried to leave galaxy", () => {
        const cases = [[37, 0], [0, 37], [37, 37], [-29, 0], [0, -29], [-29, -29]];
        const expected = {
            quadrant: {
                x: 3,
                y: 3
            },
            sector: {
                x: 3,
                y: 3
            }
        };
        cases.forEach(c => {
            game.movePlayer(c[0], c[1]);
            expect(game.player.getPosition()).toEqual(expected);
            game.player.setPosition(new Point(3, 3), new Point(3, 3));
        });
    });

    it("Should reduce players power", () => {
        const cases = [[2, 0, 2], [0, 2, 2], [-2, 2, 4], [10, 10, 20], [1, 1, 2]];
        cases.forEach(c => {
            game.movePlayer(c[0], c[1]);
            expect(game.player.power).toBe(600 - c[2]);
            game.player.setPosition(new Point(3, 3), new Point(3, 3));
            game.player.power = 600;
        });
    });
});

it("Should reduce stardates when change quadrant", () => {
    const cases = [[1, 1, 0], [8, 1, 1], [1, 8, 1], [1, 16, 2], [32, 1, 4], [32, 8, 5], [8, 8, 2]];
    cases.forEach(c => {
        game.movePlayer(c[0], c[1]);
        expect(game.starDates).toBe(30 - c[2]);
        game.player.setPosition(new Point(3, 3), new Point(3, 3));
        game.starDates = 30;
    });
});

describe('Test LongScan', () => {
    it('Should return an 3d array of proper length', () => {
        game.galaxy.SpaceObjects = [];
        const cases = [
            [new Point(3, 3), 3, 3],
            [new Point(0, 0), 2, 2],
            [new Point(0, 3), 3, 2],
            [new Point(0, 7), 2, 2],
            [new Point(3, 7), 2, 3],
            [new Point(7, 7), 2, 2],
            [new Point(7, 3), 3, 2],
            [new Point(7, 0), 2, 2],
            [new Point(3, 0), 2, 3]
        ];

        cases.forEach(c =>{
            game.player.quadrant = c[0];
            let result = game.longScan();
            expect(result.length).toBe(c[1]);
            result.forEach(column => expect(column.length).toBe(c[2]))
        });
    });

    it('Should return array of proper schema', () => {
        game.galaxy.SpaceObjects = [];
        const expected = [
            [[0, 0, 0],[0, 0, 0],[0, 0, 0]],
            [[0, 0, 0],[0, 0, 0],[0, 0, 0]],
            [[0, 0, 0],[0, 0, 0],[0, 0, 0]]
        ]
        expect(game.longScan()).toEqual(expected);
    });

    it('Should return proper number of objects', () => {
        game.player.quadrant = new Point(1, 1);
        game.galaxy.SpaceObjects = [
            new SpaceShip(new Point(0, 0), new Point(0, 0), 600),
            new SpaceShip(new Point(0, 0), new Point(0, 2), 600),
            new SpaceObject(new Point(1, 0), new Point(3, 4), 'starbase'),
            new SpaceObject(new Point(1, 0), new Point(3, 3), 'star'),
            new SpaceObject(new Point(4, 4), new Point(3, 3), 'star')
        ];

        const expected = [
            [[2, 0, 0], [0, 1, 1], [0, 0, 0]],
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        ];

        expect(game.longScan()).toEqual(expected);
    });

    it('Should update knowGalaxy', () => {
        game.player.quadrant = new Point(1, 1);
        game.galaxy.SpaceObjects = [
            new SpaceShip(new Point(0, 0), new Point(0, 0), 600),
            new SpaceShip(new Point(0, 0), new Point(0, 2), 600),
            new SpaceObject(new Point(1, 0), new Point(3, 4), 'starbase'),
            new SpaceObject(new Point(1, 0), new Point(3, 3), 'star'),
            new SpaceObject(new Point(4, 4), new Point(3, 3), 'star')
        ];
        const us = ['?', '?', '?'];
        const ks = [
            [[2, 0, 0], [0, 1, 1], [0, 0, 0]],
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        ];
        const expected = [
            [ks[0][0], ks[1][0], ks[2][0], us, us, us, us, us],
            [ks[0][1], ks[1][1], ks[2][1], us, us, us, us, us],
            [ks[0][2], ks[1][2], ks[2][2], us, us, us, us, us],
            [us, us, us, us, us, us, us, us],
            [us, us, us, us, us, us, us, us],
            [us, us, us, us, us, us, us, us],
            [us, us, us, us, us, us, us, us],
            [us, us, us, us, us, us, us, us]
        ];
        game.longScan();
        expect(game.knownGalaxy).toEqual(expected);
    })
});



