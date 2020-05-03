import { HIT, EMPTY, END_OF_HIT, CLICKTYPES, HIT_COLORS } from './Constants'
const getVariations = (length, minimumSpace) => {
    if (!minimumSpace) {
        let empty = '';
        for (let index = 0; index < length; index++) {
            empty += EMPTY
        }
        return [empty];
    }

    const numberOfVariationGroups = (length - minimumSpace.length) + 1;
    const variations = [];
    for (let index = 0; index < numberOfVariationGroups; index++) {
        let variation = minimumSpace;
        for (let subI = 0; subI < index; subI++) {
            variation = EMPTY + variation;
        }
        const endOfFirstElementInVariation = variation.search(END_OF_HIT);
        const variationFirstCut = endOfFirstElementInVariation + 1;
        const variationTemplate = variation.slice(0, variationFirstCut);
        let subVariationMinSpace = variation.slice(variationFirstCut);

        if (variation.search(END_OF_HIT) >= 0) {
            const subVariationSize = length - variationTemplate.length;
            const subSubVariations = getVariations(subVariationSize, subVariationMinSpace);
            subSubVariations.forEach(subVariation => {
                variations.push(variationTemplate + subVariation);
            });
        } else {
            while (length > subVariationMinSpace.length) {
                subVariationMinSpace += 0;
            }
            variations.push(variationTemplate + subVariationMinSpace);
        }
    }
    return variations;
}
const calculatePossibilities = (length, grouping) => {
    const notLastElement = (arr, idx) => !Object.is(arr.length - 1, idx);

    let minimumSpace = '';
    grouping.forEach((x, key, arr) => {
        for (let i = 0; i < x; i++) {
            minimumSpace += 1;
        }
        if (notLastElement(arr, key)) {
            minimumSpace += 0;
        }
    });

    return getVariations(length, minimumSpace);
}

const valuesReducer = (numberOfGroups, callback) => {
    const result = [];
    for (let i = 0; i < numberOfGroups; i++) {
        const array = [];

        const value = callback(0, array, i);

        if (value) {
            array.push(value);
        }

        result.push(array);
    }

    return result;
}
export const rowValuesReducer = (matrix) => valuesReducer(matrix.length, (value, row, index) => {
    for (let j = 0; j < matrix[0].length; j++) {
        if (matrix[index][j] === HIT) {
            value++;
            if (matrix[index][j + 1] !== HIT) {
                row.push(value);
                value = 0;
            }
        }
    }
    return value;
});

export const columnValuesReducer = (matrix) => valuesReducer(matrix[0].length, (value, column, index) => {
    for (let j = 0; j < matrix.length; j++) {
        if (matrix[j][index] === HIT) {
            value++;
            if (matrix[j + 1] && (matrix[j + 1][index] !== HIT)) {
                column.push(value);
                value = 0;
            }
        }
    }
    return value;
});
export const calculateArrayPossibilities = (arrayValues, length) => arrayValues.map(x => calculatePossibilities(length, x));


const getAllHitIndexes = (array) => array.reduce((arr, e, i) => (((e === HIT) && arr.push(i), arr)), []);
const getAllCrossIndexes = (array) => array.reduce((arr, e, i) => (((e.hited && e.hitType === CLICKTYPES.Cross) && arr.push(i), arr)), []);
const getIndexes = (input, binarySolution) => ({ hitIndex: getAllHitIndexes(binarySolution), crossIndex: getAllCrossIndexes(input) });
export const isUserSolutionPotentiallyValid = (userInput, possibilities) => {
    const binaryArrayUserSolution = userInput.map((obj) => obj.hited ? obj.hitType === CLICKTYPES.Hit ? '1' : '0' : '0');
    const { hitIndex, crossIndex } = getIndexes(userInput, binaryArrayUserSolution);

    const bitUser = parseInt(binaryArrayUserSolution.join(''), 2);
    return possibilities.some(possibility => {
        const bitPos = parseInt(possibility, 2);
        const or = bitPos | bitUser;
        const xor = or ^ bitPos;
        let xorStringAgain = xor.toString(2);
        while (possibility.length > xorStringAgain.length) {
            xorStringAgain = EMPTY + xorStringAgain;
        }

        const userHits = hitIndex.every(x => xorStringAgain[x] === EMPTY);
        const userCross = crossIndex.every(x => possibility[x] === EMPTY);
        return userHits === true && userCross === true;
    });
}

export const isUserSolutionCompleted = (userInput, possibilities) => {
    const binaryArrayUserSolution = userInput.map((obj) => obj.hited ? obj.hitType === CLICKTYPES.Hit ? '1' : '0' : '0');
    const { hitIndex } = getIndexes(userInput, binaryArrayUserSolution);
    if (hitIndex.length === 0) return undefined;
    return possibilities.find((possibility, index) => {
        const pHitIndex = getAllHitIndexes(Array.from(possibility));
        return pHitIndex.every(e => hitIndex.includes(e)) && hitIndex.every(e => pHitIndex.includes(e));
    })
}

export const parseInput = (possibility) => {
    return Array.from(possibility).map(c => {
        if (c === HIT) return { hitType: CLICKTYPES.Hit, hited: true, value: '', color: HIT_COLORS.hit }
        else return { hitType: CLICKTYPES.Cross, hited: true, value: CLICKTYPES.Cross, color: HIT_COLORS.empty, auto: true }
    });
}