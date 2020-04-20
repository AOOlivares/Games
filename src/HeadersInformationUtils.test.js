import { HeaderMethods, HeadersInformationMethods } from './HeadersInformationUtils';
import * as Constants from './Constants';
describe('HeaderMethods() Falsy', () => {
    test.each([
        [[{ hitType: Constants.CLICKTYPES.Hit, hited: true }, { hitType: Constants.CLICKTYPES.Hit, hited: true }, { hited: false }], ['100', '010', '001']],
        [[{ hitType: Constants.CLICKTYPES.Cross, hited: true }, { hitType: Constants.CLICKTYPES.Cross, hited: true }, { hitType: Constants.CLICKTYPES.Cross, hited: true }], ['100', '010', '001']],
        [[{ hitType: Constants.CLICKTYPES.Hit, hited: true }, { hitType: Constants.CLICKTYPES.Cross, hited: true }, { hitType: Constants.CLICKTYPES.Hit, hited: true }], ['110', '011']]
    ])('userPotentialSolution returns false if user solution fail to validate', (userSolution, possibleSolutions) => {
        expect(HeaderMethods().isUserSolutionPotentiallyValid(userSolution, possibleSolutions)).toBeFalsy();
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
        expect(HeaderMethods().isUserSolutionPotentiallyValid(userSolution, possibleSolutions)).toBeTruthy();
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
        const result = HeadersInformationMethods(matrix).rowHeaderValues;
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
    ])('columHeaderValues returns the expected collection of values', (matrix, expected) => {
        const result = HeadersInformationMethods(matrix).columHeaderValues;
        result.forEach((x, xi) => {
            x.forEach((y, yi) => {
                expect(y).toBe(expected[xi][yi]);
            })
        })
    });

    test.each([
        [
            [
                [Constants.EMPTY, Constants.HIT, Constants.HIT],
                [Constants.HIT, Constants.EMPTY, Constants.HIT],
                [Constants.HIT, Constants.EMPTY, Constants.EMPTY]
            ],
            [
                ['011', '110'],
                ['101'],
                ['001', '010', '100']
            ]
        ]
    ])('rowsPotentialSolutions returns the expected collection of values', (matrix, expected) => {
        const result = HeadersInformationMethods(matrix).rowsPotentialSolutions;
        result.forEach((x, xi) => {
            expected[xi].forEach((y, yi) => {
                expect(x.includes(y)).toBeTruthy()
            });
        })
    });

    test.each([
        [
            [
                [Constants.EMPTY, Constants.HIT, Constants.HIT],
                [Constants.HIT, Constants.EMPTY, Constants.EMPTY],
                [Constants.HIT, Constants.EMPTY, Constants.HIT]
            ],
            [
                ['011', '110'],
                ['001', '010', '100'],
                ['101']
            ]
        ]
    ])('columnsPotentialSolutions returns the expected collection of values', (matrix, expected) => {
        const result = HeadersInformationMethods(matrix).columnsPotentialSolutions;
        result.forEach((x, xi) => {
            expected[xi].forEach((y, yi) => {
                expect(x.includes(y)).toBeTruthy()
            });
        })
    });
});
