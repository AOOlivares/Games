import { isUserSolutionPotentiallyValid, rowValuesReducer, columnValuesReducer, calculateArrayPossibilities, isUserSolutionCompleted } from './gameUtils';
import * as Constants from './Constants';
describe('HeaderMethods() Falsy', () => {
    test.each([
        [[{ hitType: Constants.CLICKTYPES.Hit, hited: true }, { hitType: Constants.CLICKTYPES.Hit, hited: true }, { hited: false }], ['100', '010', '001']],
        [[{ hitType: Constants.CLICKTYPES.Cross, hited: true }, { hitType: Constants.CLICKTYPES.Cross, hited: true }, { hitType: Constants.CLICKTYPES.Cross, hited: true }], ['100', '010', '001']],
        [[{ hitType: Constants.CLICKTYPES.Hit, hited: true }, { hitType: Constants.CLICKTYPES.Cross, hited: true }, { hitType: Constants.CLICKTYPES.Hit, hited: true }], ['110', '011']]
    ])('userPotentialSolution returns false if user solution fail to validate', (userSolution, possibleSolutions) => {
        expect(isUserSolutionPotentiallyValid(userSolution, possibleSolutions)).toBeFalsy();
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
        expect(isUserSolutionPotentiallyValid(userSolution, possibleSolutions)).toBeTruthy();
    });

    test.each([
        [
            [
                { hitType: Constants.CLICKTYPES.Hit, hited: true },
                { hitType: Constants.CLICKTYPES.Cross, hited: true },
                { hited: false }
            ],
            ['100', '010', '001']
        ]
    ])('isUserSolutionCompleted returns true when userHits completed possibility hits', (userSolution, possibleSolutions) => {
        expect(isUserSolutionCompleted(userSolution, possibleSolutions)).toBe('100');
    });

    test.each([
        [
            [
                { hitType: Constants.CLICKTYPES.Cross, hited: true },
                { hitType: Constants.CLICKTYPES.Cross, hited: true },
                { hited: false }
            ],
            ['100', '010', '001']
        ],
        [
            [
                { hitType: Constants.CLICKTYPES.Hit, hited: true },
                { hitType: Constants.CLICKTYPES.Hit, hited: true },
                { hited: false }
            ],
            ['100', '010', '001']
        ]
    ])('isUserSolutionCompleted returns undefined when userHits do not completed possibility hits', (userSolution, possibleSolutions) => {
        expect(isUserSolutionCompleted(userSolution, possibleSolutions)).toBe(undefined);
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
                [1],
                []
            ],
            [
                ['0011', '1100', '0110'],
                ['1010', '1001', '0101'],
                ['0001', '0010', '0100', '1000'],
                ['0000']
            ]
        ]
    ])('calculateArrayPossibilities returns the expected collection of values', (matrix, expected) => {
        const result = calculateArrayPossibilities(matrix, matrix.length);
        result.forEach((x, xi) => {
            expected[xi].forEach((y, yi) => {
                expect(x.includes(y)).toBeTruthy()
            });
        })
    });
});
