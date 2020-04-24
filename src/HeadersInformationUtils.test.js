import { HeaderHelperMethods, rowValuesReducer, columnValuesReducer, calculateArrayPossibilities } from './HeadersInformationUtils';
import * as Constants from './Constants';
describe('HeaderMethods() Falsy', () => {
    test.each([
        [[{ hitType: Constants.CLICKTYPES.Hit, hited: true }, { hitType: Constants.CLICKTYPES.Hit, hited: true }, { hited: false }], ['100', '010', '001']],
        [[{ hitType: Constants.CLICKTYPES.Cross, hited: true }, { hitType: Constants.CLICKTYPES.Cross, hited: true }, { hitType: Constants.CLICKTYPES.Cross, hited: true }], ['100', '010', '001']],
        [[{ hitType: Constants.CLICKTYPES.Hit, hited: true }, { hitType: Constants.CLICKTYPES.Cross, hited: true }, { hitType: Constants.CLICKTYPES.Hit, hited: true }], ['110', '011']]
    ])('userPotentialSolution returns false if user solution fail to validate', (userSolution, possibleSolutions) => {
        expect(HeaderHelperMethods().isUserSolutionPotentiallyValid(userSolution, possibleSolutions)).toBeFalsy();
    });
});

describe('HeaderMethods() Truthy', () => {
    test.each([
        [
            [
                { hitType: Constants.CLICKTYPES.Hit, hited: true },
                { hitType: Constants.CLICKTYPES.Cross, hited: true },
                { hited: false }
            ],
            ['100', '010', '001']
        ],
        [
            [
                { hitType: Constants.CLICKTYPES.Hit, hited: true },
                { hitType: Constants.CLICKTYPES.Cross, hited: true },
                { hitType: Constants.CLICKTYPES.Unknown, hited: true }
            ],
            ['100', '010', '001']
        ]
    ])('userPotentialSolution returns true if user solution pass', (userSolution, possibleSolutions) => {
        expect(HeaderHelperMethods().isUserSolutionPotentiallyValid(userSolution, possibleSolutions)).toBeTruthy();
    });
});


describe('HeadersInformationMethods()', () => {
    test.each([
        [
            [
                [Constants.HIT, Constants.EMPTY, Constants.HIT],
                [Constants.HIT, Constants.HIT, Constants.HIT],
                [Constants.EMPTY, Constants.EMPTY, Constants.EMPTY]
            ],
            [
                [1, 1],
                [3],
                []
            ]
        ]
    ])('rowValuesReducer returns the expected collection of values', (matrix, expected) => {
        const result = rowValuesReducer(matrix);
        result.forEach((x, xi) => {
            x.forEach((y, yi) => {
                expect(y).toBe(expected[xi][yi]);
            })
        })
    });

    test.each([
        [
            [
                [Constants.HIT, Constants.EMPTY, Constants.HIT],
                [Constants.HIT, Constants.EMPTY, Constants.EMPTY]
            ],
            [
                [2],
                [],
                [1]
            ]
        ]
    ])('columnValuesReducer returns the expected collection of values', (matrix, expected) => {
        const result = columnValuesReducer(matrix);
        result.forEach((x, xi) => {
            x.forEach((y, yi) => {
                expect(y).toBe(expected[xi][yi]);
            })
        })
    });

    test.each([
        [
            [
                [2],
                [1, 1],
                [1]
            ],
            [
                ['011', '110'],
                ['101'],
                ['001', '010', '100']
            ]
        ]
    ])('calculateArrayPossibilities returns the expected collection of values', (matrix, expected) => {
        const result = calculateArrayPossibilities(matrix, matrix.length);
        console.log(result);
        result.forEach((x, xi) => {
            expected[xi].forEach((y, yi) => {
                expect(x.includes(y)).toBeTruthy()
            });
        })
    });
});
