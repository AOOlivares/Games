import React from 'react';
import * as Constants from './Constants';

const styles = {
    headers: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gridGap: "3px",
        height: "100%",
        boxSizing: "border-box",
    },
    header: {
        display: "grid",
        gridGap: "3px",
        height: "100%",
        boxSizing: "border-box",
    },
    panel: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    rowHeaders: {
        gridColumn: "1",
        gridRow: "2 / 4",
    },
    columnHeaders: {
        gridColumn: "2 / 4",
        gridRow: "1",
    }
}

const getAllHitIndexes = (array) => array.reduce((arr, e, i) => (((e === Constants.HIT) && arr.push(i), arr)), []);
const getAllCrossIndexes = (array) => array.reduce((arr, e, i) => (((e.hited && e.hitType === Constants.CLICKTYPES.Cross) && arr.push(i), arr)), []);
const getIndexes = (userInput, binaryArrayUserSolution) => ({ uHitIndex: getAllHitIndexes(binaryArrayUserSolution), uCrossIndex: getAllCrossIndexes(userInput) });
const isUserSolutionPotentiallyValid = (userInput, posibilities) => {
    const binaryArrayUserSolution = userInput.map((obj) => obj.hited ? obj.hitType === Constants.CLICKTYPES.Hit ? '1' : '0' : '0');
    const { uHitIndex, uCrossIndex } = getIndexes(userInput, binaryArrayUserSolution);

    const bitUser = parseInt(binaryArrayUserSolution.join(''), 2);

    return posibilities.some(posibility => {
        const bitPos = parseInt(posibility, 2);
        const or = bitPos | bitUser;
        const xor = or ^ bitPos;
        let xorStringAgain = xor.toString(2);
        while (posibility.length > xorStringAgain.length) {
            xorStringAgain = Constants.EMPTY + xorStringAgain;
        }

        const userHits = uHitIndex.every(x => xorStringAgain[x] === Constants.EMPTY);
        const userCross = uCrossIndex.every(x => posibility[x] === Constants.EMPTY);
        return userHits === true && userCross === true;
    });
}

const Panel = ({ backgroundColor, value, }) => <div style={{ ...styles.panel, backgroundColor: backgroundColor }}>{value}</div>;

const Header = ({ headerValues, userSolution, possibleSolutions, alignment }) => {
    const areTheSameStyle = isUserSolutionPotentiallyValid(userSolution, possibleSolutions);
    const backgroundColor = areTheSameStyle ? "#79d279" : "#ff6363";
    if (headerValues.length === 0) {
        return (
            <div style={{ ...styles.header, ...alignment }}>
                <Panel backgroundColor={backgroundColor} />
            </div>
        )
    }
    return (
        <div style={{ ...styles.header, ...alignment }}>
            {headerValues.map((value, index) => (
                <Panel key={index} backgroundColor={backgroundColor} value={value} />
            ))}
        </div>
    )
}

const Headers = ({ alignment, headersValues, gridTemplate, userSolution, potentialSolutions }) => (
    <div style={{ ...styles.headers, ...gridTemplate }}>
        {headersValues.map((headerValues, index) => (
            <Header
                alignment={alignment}
                key={index}
                headerValues={headerValues}
                userSolution={userSolution[index]}
                possibleSolutions={potentialSolutions[index]}
            />
        ))}
    </div>
)

const getVariations = (length, minimumSpace) => {
    if (!minimumSpace) return [Constants.EMPTY];
    const numberOfVariationGroups = (length - minimumSpace.length) + 1;
    const variations = [];
    for (let index = 0; index < numberOfVariationGroups; index++) {
        let variation = minimumSpace;
        for (let subI = 0; subI < index; subI++) {
            variation = Constants.EMPTY + variation;
        }
        const endOfFirstElementInVariation = variation.search(Constants.END_OF_HIT);
        const variationFirstCut = endOfFirstElementInVariation + 1;
        const variationTemplate = variation.slice(0, variationFirstCut);
        let subVariationMinSpace = variation.slice(variationFirstCut);

        if (variation.search(Constants.END_OF_HIT) >= 0) {
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

const calculatePosibilities = (length, grouping) => {
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

const rowValuesReducer = (matrix) => valuesReducer(matrix.length, (value, row, index) => {
    for (let j = 0; j < matrix[0].length; j++) {
        if (matrix[index][j] === Constants.HIT) {
            value++;
            if (matrix[index][j + 1] !== Constants.HIT) {
                row.push(value);
                value = 0;
            }
        }
    }
    return value;
});
const rowHeaderValues = rowValuesReducer(Constants.MATRIX);
const rowsPotentialSolutions = rowHeaderValues.map(x => calculatePosibilities(Constants.MATRIX[0].length, x));

const RowHeaders = ({ userSolution }) => {
    const gridTemplate = { gridTemplateRows: `repeat(${rowHeaderValues.length}, 1fr)` };
    const vertical = { gridAutoFlow: "column" };
    return (
        <div style={styles.rowHeaders}>
            <Headers
                alignment={vertical}
                headersValues={rowHeaderValues}
                gridTemplate={gridTemplate}
                userSolution={userSolution}
                potentialSolutions={rowsPotentialSolutions} />
        </div>
    )
}

const columnValuesReducer = (matrix) => valuesReducer(matrix[0].length, (value, column, index) => {
    for (let j = 0; j < matrix.length; j++) {
        if (matrix[j][index] === Constants.HIT) {
            value++;
            if (matrix[j + 1] && (matrix[j + 1][index] !== Constants.HIT)) {
                column.push(value);
                value = 0;
            }
        }
    }
    return value;
});

const columHeaderValues = columnValuesReducer(Constants.MATRIX);
const columnsPotentialSolutions = columHeaderValues.map(x => calculatePosibilities(Constants.MATRIX.length, x));

const ColumnHeaders = ({ userSolution }) => {
    const gridTemplate = { gridTemplateColumns: `repeat(${columHeaderValues.length}, 1fr)` };
    return (
        <div style={styles.columnHeaders}>
            <Headers
                headersValues={columHeaderValues}
                gridTemplate={gridTemplate}
                userSolution={userSolution}
                potentialSolutions={columnsPotentialSolutions} />
        </div>
    )
}

const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );

const verticalChunk = (horizontalChunks, columns) => {
    const vChunks = [];
    for (let index = 0; index < columns; index++) {
        vChunks.push(horizontalChunks.map((v, i, array) => array[i][index]))
    }
    return vChunks;
}

export default function HeadersInformation({ userSolution }) {
    const hChunks = chunk(userSolution, columHeaderValues.length);
    const vChunks = verticalChunk(hChunks, Constants.MATRIX[0].length);
    return (
        <>
            <ColumnHeaders userSolution={vChunks} />
            <RowHeaders userSolution={hChunks} />
        </>
    )
} 