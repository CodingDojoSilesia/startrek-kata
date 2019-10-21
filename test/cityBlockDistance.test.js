const cityBlockDistance = require('../src/utils/cityBlockDistance');

test.each([
    [0, 0, 1, 1, 2],
    [0, 0, -1, -1, 2],
    [0, 0, 0, 0, 0]
])('calculates distance between different points in a space', (x1, y1, x2, y2, expected) => {
    expect(cityBlockDistance(x1, y1, x2, y2)).toBe(expected);
});
