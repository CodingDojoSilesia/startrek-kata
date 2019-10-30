const mathSupport = require("../src/utils/mathSupport");
const Point = require('../src/utils/point');

describe('Test cityBlockDistance', () => {
    test.each([[0, 0, 1, 1, 2], [0, 0, -1, -1, 2], [0, 0, 0, 0, 0]])(
        "calculates distance between different points in a space",
        (x1, y1, x2, y2, expected) => {
            expect(mathSupport.cityBlockDistance(x1, y1, x2, y2)).toBe(expected);
        }
    );
});

describe('Test randomUniques', () => {
    it('Should return an array of integers', () => {
        const result = mathSupport.randomUniques(0, 10, 5);
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(5);
        result.forEach(el => expect(typeof el).toBe('number'));
    })
    it('Should have no repeating numbers', () => {
        const min = 1;
        const max = 100;
        const result = mathSupport.randomUniques(min, max, max - min);
        for (let i = min; i < max - min; i++){
            expect(result.lastIndexOf(result[i])).toBe(i);
        }
    })
    it('Should return every number if range is equals to length', () => {
        const min = 1;
        const max = 100;
        const result = mathSupport.randomUniques(min, max, max - min);
        for (let i = min; i < max; i++){
            expect(result).toContain(i);
        }
    });
    it('Should throw an error if given length is bigger than range', () => {
        expect(() => mathSupport.randomUniques(0, 10, 11)).toThrow(RangeError);
    })
});

describe('Test getQuadrantFromSectorNumber', () => {
    it('Should return a point object', () => {
        let result = mathSupport.getQuadrantFromSectorNumber(0);
        expect(result).toEqual(expect.objectContaining({
            x: expect.any(Number),
            y: expect.any(Number)
        }));
    });
    it('Should return quadrant position on proper sector number', () => {
        const cases = [
            [0, new Point(0, 0)],
            [7, new Point(0, 0)],
            [8, new Point(1, 0)],
            [63, new Point(7, 0)],
            [64, new Point(0, 1)],
            [127, new Point(7, 1)],
            [4095, new Point(7, 7)]
        ]
        cases.forEach(c => 
            expect(mathSupport.getQuadrantFromSectorNumber(c[0])).toEqual(c[1])
        );
    })
});

describe('Test getSectorFromSectorNumber', () => {
    it('Should return a point object', () => {
        let result = mathSupport.getSectorFromSectorNumber(0);
        expect(result).toEqual(expect.objectContaining({
            x: expect.any(Number),
            y: expect.any(Number)
        }));
    });
    it('Should return sector position on proper sector number', () => {
        const cases = [
            [0, new Point(0, 0)],
            [7, new Point(7, 0)],
            [8, new Point(0, 0)],
            [63, new Point(7, 0)],
            [64, new Point(0, 1)],
            [65, new Point(1, 1)],
            [71, new Point(7, 1)],
            [4095, new Point(7, 7)]
        ]
        cases.forEach(c => 
            expect(mathSupport.getSectorFromSectorNumber(c[0])).toEqual(c[1])
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
            [new Point(7, 7), new Point(7, 7), 4095]
        ]
        cases.forEach(c => expect(mathSupport.getSectorNumberFromPosition(c[0], c[1])).toBe(c[2]));
    })
})