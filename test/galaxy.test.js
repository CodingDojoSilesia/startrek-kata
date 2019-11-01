const Galaxy = require('../src/core/galaxy');
const SpaceObject = require('../src/core/spaceObject');
const SpaceShip = require('../src/core/spaceShip');
const Point = require('../src/utils/point');
const config = {
    QUADRANTS: 64,
    SECTORS_IN_QUADRANT: 64,
    KLINGON_SHIPS: 7,
    STARBASES: 2,
    STARS: 20
}
let galaxy = new Galaxy(config);

beforeEach(() => galaxy = new Galaxy(config));

describe("Test generateObjects", () => {
    it("Should return an array of SpaceObjects", () => {
        const result = galaxy.generateObjects();
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(29);
        result.forEach(el => expect(el).toBeInstanceOf(SpaceObject));
    });
    it("Should return proper objects", () => {
        const result = galaxy.generateObjects();
        let nofK = 0;
        let nofSB = 0;
        let nofS = 0;
        result.forEach(el => {
            if(el.type == 'ship')
                nofK++;
            if(el.type == 'starbase')
                nofSB++;
            if(el.type == 'star')
                nofS++;
        });
        expect(nofK).toBe(config.KLINGON_SHIPS);
        expect(nofS).toBe(config.STARS);
        expect(nofSB).toBe(config.STARBASES);
    });
});
describe('Test getQuadrantFromSectorNumber', () => {
    it('Should return a point object', () => {
        let result = galaxy.getQuadrantFromSectorNumber(0);
        expect(result).toEqual(expect.objectContaining({
            x: expect.any(Number),
            y: expect.any(Number)
        }));
    });
    it('Should return quadrant position on proper sector number', () => {
        const cases = [
            [0, new Point(0, 0)],
            [7, new Point(0, 0)],
            [8, new Point(0, 1)],
            [63, new Point(0, 7)],
            [64, new Point(0, 0)],
            [127, new Point(0, 7)],
            [512, new Point(1, 0)],
            [520, new Point(1, 1)],
            [4095, new Point(7, 7)]
        ]
        cases.forEach(c => 
            expect(galaxy.getQuadrantFromSectorNumber(c[0])).toEqual(c[1])
        );
    })
});

describe('Test getSectorFromSectorNumber', () => {
    it('Should return a point object', () => {
        let result = galaxy.getSectorFromSectorNumber(0);
        expect(result).toEqual(expect.objectContaining({
            x: expect.any(Number),
            y: expect.any(Number)
        }));
    });
    it('Should return sector position on proper sector number', () => {
        const cases = [
            [0, new Point(0, 0)],
            [7, new Point(0, 7)],
            [8, new Point(0, 0)],
            [63, new Point(0, 7)],
            [64, new Point(1, 0)],
            [65, new Point(1, 1)],
            [71, new Point(1, 7)],
            [4095, new Point(7, 7)],
            [520, new Point(0, 0)],
            [521, new Point(0, 1)],
            [584, new Point(1, 0)],
            [585, new Point(1, 1)]
        ]
        cases.forEach(c => 
            expect(galaxy.getSectorFromSectorNumber(c[0])).toEqual(c[1])
        );
    })
});

describe('Test getSectorNumberFromPosition', () => {
    it('Should retur sector number on proper position', () => {
        const cases = [
            [new Point(0, 0), new Point(0, 0), 0],
            [new Point(0, 0), new Point(7, 0), 7],
            [new Point(0, 0), new Point(0, 1), 64],
            [new Point(0, 0), new Point(7, 1), 71],
            [new Point(1, 0), new Point(0, 0), 8],
            [new Point(1, 0), new Point(0, 1), 72],
            [new Point(0, 1), new Point(0, 0), 512],
            [new Point(7, 7), new Point(7, 7), 4095],
            [new Point(1, 1), new Point(0, 0), 520],
            [new Point(1, 1), new Point(1, 0), 521],
            [new Point(1, 1), new Point(0, 1), 584],
            [new Point(1, 1), new Point(1, 1), 585]
        ]
        cases.forEach(c => expect(galaxy.getSectorNumberFromPosition(c[0], c[1])).toBe(c[2]));
    })
});

describe('Test getGlobalPositionFromSectorNumber', () => {
    it('Should return global position from proper sector number', () => {
        const cases = [
            [0, new Point(0, 0)],
            [1, new Point(1, 0)],
            [63, new Point(63, 0)],
            [64, new Point(0, 1)],
            [65, new Point(1, 1)],
            [127, new Point(63, 1)],
            [512, new Point(0, 8)],
            [4095, new Point(63, 63)]
        ];
        cases.forEach(c => expect(galaxy.getGlobalPositionFromSectorNumber(c[0])).toEqual(c[1]));
    });
});

describe('Test getQuadrant', () => {

    it('Should return array of spaceObjects when quadrant is not empty', () => {
        galaxy.SpaceObjects = [
            new SpaceObject(new Point(3, 3), new Point(3, 3)),
            new SpaceObject(new Point(3, 3), new Point(2, 1)),
            new SpaceObject(new Point(3, 3), new Point(5, 8)),
            new SpaceObject(new Point(4, 3), new Point(3, 3)),
            new SpaceObject(new Point(3, 5), new Point(3, 3))
        ];
        const result = galaxy.getQuadrantObjects(new Point(3, 3));
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(3);
        result.forEach(el => expect(el).toBeInstanceOf(SpaceObject));
    })

    it('Should return empty when quadrant is empty', () => {
        galaxy.SpaceObjects = [
            new SpaceObject(new Point(3, 3), new Point(3, 3)),
            new SpaceObject(new Point(3, 3), new Point(2, 1)),
            new SpaceObject(new Point(3, 3), new Point(5, 8)),
            new SpaceObject(new Point(4, 3), new Point(3, 3)),
            new SpaceObject(new Point(3, 5), new Point(3, 3))
        ];
        const result = galaxy.getQuadrantObjects(new Point(1, 1));
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(0);
    })
});

describe('Test getRemainingKlingons', () => {
    it('Should return number of klingon in whole galaxy', () => {
        galaxy.SpaceObjects = [
            new SpaceObject(new Point(3, 3), new Point(3, 3)),
            new SpaceObject(new Point(4, 2), new Point(3, 3)),
            new SpaceObject(new Point(1, 0), new Point(3, 3)),
            new SpaceShip(new Point(0, 0), new Point(3, 3)),
            new SpaceShip(new Point(0, 0), new Point(0, 0)),
            new SpaceShip(new Point(2, 0), new Point(3, 3))
        ];
        expect(galaxy.getRemainingKlingons()).toBe(3);
    });
    it('Should return 0 if there is no more klingons', () => {
        galaxy.SpaceObjects = [
            new SpaceObject(new Point(3, 3), new Point(3, 3)),
            new SpaceObject(new Point(4, 2), new Point(3, 3)),
            new SpaceObject(new Point(1, 0), new Point(3, 3))
        ];
        expect(galaxy.getRemainingKlingons()).toBe(0);
    })
});

describe('Test getSurroundingQuadrantsPos', () => {
    it('Should return an array of points', () => {
        const cases = [
            [new Point(0, 0), [2, 2]],
            [new Point(0, 1), [3, 2]],
            [new Point(7, 0), [2, 2]],
            [new Point(7, 7), [2, 2]],
            [new Point(3, 3), [3, 3]],
            [new Point(3, 0), [2, 3]]
        ];

        cases.forEach(c => {
            let result = galaxy.getSurroundingQuadrantsPos(c[0]);
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(c[1][0]);
            result.forEach(el => expect(el.length).toBe(c[1][1]));
        })
    });
})
