const Game = require("../src/core/game");
const SpaceObject = require("../src/core/spaceObject");
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

describe("Test construtor", () => {
    game = new Game(config);
    expect(game.player.power).toBe(600);
});

describe("Test movePlayer", () => {
    const game = new Game(config);

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
            [[2, 0], [3, 3], [5, 3]],
            [[-2, 0], [3, 3], [1, 3]],
            [[0, 2], [3, 3], [3, 5]],
            [[0, -2], [3, 3], [3, 1]],
            [[2, 2], [3, 3], [5, 5]],
            [[8, 0], [4, 3], [3, 3]],
            [[-8, 0], [2, 3], [3, 3]],
            [[8, 8], [4, 4], [3, 3]],
            [[0, 8], [3, 4], [3, 3]],
            [[0, -8], [3, 2], [3, 3]],
            [[9, 9], [4, 4], [4, 4]]
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
        const cases = [[100, 0], [0, 100], [100, 100], [-100, 0], [0, -100], [-100, -100]];
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
    xit('Should return an 3d array containing numbers of objects in surroinging quadrants', () => {
        galaxy.SpaceObjects = [
            new SpaceObject(new Point(3, 3), new Point(3, 3), 'starbase'),
            new SpaceObject(new Point(4, 2), new Point(3, 3), 'star'),
            new SpaceObject(new Point(1, 0), new Point(3, 3), 'starbase'),
            new SpaceShip(new Point(0, 0), new Point(3, 3)),
            new SpaceShip(new Point(0, 0), new Point(0, 0)),
            new SpaceShip(new Point(2, 0), new Point(3, 3)),
        ];
        const expected = [
            []
        ]
    })
});
