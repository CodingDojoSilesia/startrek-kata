const SpaceObject = require("../src/core/spaceObject");
const SpaceShip = require("../src/core/spaceShip");
const Point = require("../src/utils/point");

const renderer = require("../src/utils/renderer");
const eol = require("os").EOL;

const player = new SpaceShip(new Point(3, 3), new Point(3, 3), 600);

describe("Test renderEmptyQuadrant", () => {
    it("Should display quadrant of given schema", () => {
        const expected =
            `  _0__1__2__3__4__5__6__7_ ${eol}` +
            `7| .  .  .  .  .  .  .  . |${eol}` +
            `6| .  .  .  .  .  .  .  . |${eol}` +
            `5| .  .  .  .  .  .  .  . |${eol}` +
            `4| .  .  .  .  .  .  .  . |${eol}` +
            `3| .  .  .  .  .  .  .  . |${eol}` +
            `2| .  .  .  .  .  .  .  . |${eol}` +
            `1| .  .  .  .  .  .  .  . |${eol}` +
            `0| .  .  .  .  .  .  .  . |${eol}`;
        let result = renderer.renderEmptyQuadrant();
        expect(result).toMatch(expected);
    });
});

describe("Test renderQuadrant", () => {
    it("Should display player", () => {
        const expected =
            `  _0__1__2__3__4__5__6__7_ ${eol}` +
            `7| .  .  .  .  .  .  .  . |${eol}` +
            `6| .  .  .  .  .  .  .  . |${eol}` +
            `5| .  .  .  .  .  .  .  . |${eol}` +
            `4| .  .  .  .  .  .  .  . |${eol}` +
            `3| .  .  . <*> .  .  .  . |${eol}` +
            `2| .  .  .  .  .  .  .  . |${eol}` +
            `1| .  .  .  .  .  .  .  . |${eol}` +
            `0| .  .  .  .  .  .  .  . |${eol}`;
        let result = renderer.renderQuadrant(player, []);
        expect(result).toMatch(expected);
    });
    it("Should display all objects in quadrant", () => {
        const q = new Point(3, 3);
        const objectsInQuadrant = [
            new SpaceShip(q, new Point(0, 0), 600),
            new SpaceShip(q, new Point(0, 7), 600),
            new SpaceShip(q, new Point(7, 7), 600),
            new SpaceShip(q, new Point(7, 0), 600),
            new SpaceShip(q, new Point(4, 3), 600),
            new SpaceObject(q, new Point(1, 7), 'star'),
            new SpaceObject(q, new Point(3, 5), 'star'),
            new SpaceObject(q, new Point(3, 0), 'starbase'),
            new SpaceObject(q, new Point(1, 5), 'starbase')
        ]
        const expected =
            `  _0__1__2__3__4__5__6__7_ ${eol}` +
            `7|+++ *  .  .  .  .  . +++|${eol}` +
            `6| .  .  .  .  .  .  .  . |${eol}` +
            `5| . >!< .  *  .  .  .  . |${eol}` +
            `4| .  .  .  .  .  .  .  . |${eol}` +
            `3| .  .  . <*>+++ .  .  . |${eol}` +
            `2| .  .  .  .  .  .  .  . |${eol}` +
            `1| .  .  .  .  .  .  .  . |${eol}` +
            `0|+++ .  . >!< .  .  . +++|${eol}`;
        let result = renderer.renderQuadrant(player, objectsInQuadrant);
        expect(result).toMatch(expected);
    });
});