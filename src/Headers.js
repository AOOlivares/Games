import React from 'react';
import * as Constants from './Constants';

const getVariations = (length, minimumSpace) => {
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
    let minimumSpace = '';
    grouping.forEach((x, key, arr) => {
        for (let i = 0; i < x; i++) {
            minimumSpace += 1;
        }
        if (!Object.is(arr.length - 1, key)) {
            minimumSpace += 0;
        }
    });

    return getVariations(length, minimumSpace);
}
const columnReducer = () => {
    const result = [];
    for (var i = 0; i < Constants.MATRIX[0].length; i++) {
        const innerArrayLength = Constants.MATRIX.length;
        let columnValue = 0;
        const columnArray = [];

        for (var j = 0; j < innerArrayLength; j++) {
            if (Constants.MATRIX[j][i] === Constants.HIT) {
                columnValue++;
                if (Constants.MATRIX[j + 1] && (Constants.MATRIX[j + 1][i] !== Constants.HIT)) {
                    columnArray.push(columnValue);
                    columnValue = 0;
                }
            }
        }

        if (columnValue) {
            columnArray.push(columnValue);
        }

        result.push(columnArray);
    }

    return result;
}
const rowReducer = () => {
    const result = [];
    for (var i = 0; i < Constants.MATRIX.length; i++) {
        const innerArrayLength = Constants.MATRIX[i].length;
        let innerValue = 0;
        const innerArray = [];

        for (var j = 0; j < innerArrayLength; j++) {
            if (Constants.MATRIX[i][j] === Constants.HIT) {
                innerValue++;
                if (Constants.MATRIX[i][j + 1] !== Constants.HIT) {
                    innerArray.push(innerValue);
                    innerValue = 0;
                }
            }
        }

        if (innerValue) {
            innerArray.push(innerValue);
        }
        result.push(innerArray);
    }

    return result;
}
const rowHeaderValues = rowReducer();
const columHeaderValues = columnReducer();
const rowsPotentialSolutions = rowHeaderValues.map(x => calculatePosibilities(Constants.MATRIX[0].length, x));
const columnsPotentialSolutions = columHeaderValues.map(x => calculatePosibilities(Constants.MATRIX.length, x));

const styles = {
    panels: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gridGap: "3px",
        height: "100%",
        boxSizing: "border-box",
    },
    panel: {
        display: "grid",
        gridGap: "3px",
        height: "100%",
        boxSizing: "border-box",
    },
    header: {
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

const getAllIndexes = (arr, val) => {
    var indexes = [], i;
    for (i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

const isUserSolutionPotentiallyValid = (userInput, posibilities) => {
    const userSolutionJoined = userInput.join('');
    const userSolutionJoinedString = userSolutionJoined.toString()
    const bitUser = parseInt(userSolutionJoinedString, 2);
    const userHitIndexs = getAllIndexes(userSolutionJoinedString, Constants.HIT);

    return posibilities.some(posibility => {
        const bitPos = parseInt(posibility, 2);
        const or = bitPos | bitUser;
        const xor = or ^ bitPos;
        let xorStringAgain = xor.toString(2);
        while (posibility.length > xorStringAgain.length) {
            xorStringAgain = Constants.EMPTY + xorStringAgain;
        }

        return userHitIndexs.every(x => xorStringAgain[x] === Constants.EMPTY);
    });
}

const Header = ({ backgroundColor, value, }) => <div style={{ ...styles.header, backgroundColor: backgroundColor }}>{value}</div>

const Panel = ({ headerValues, userSolution, possibleSolutions, alignment }) => {
    const areTheSameStyle = isUserSolutionPotentiallyValid(userSolution, possibleSolutions);
    const backgroundColor = areTheSameStyle ? "#79d279" : "#ff6363";
    return (
        <div style={{ ...styles.panel, ...alignment }}>
            {headerValues.map((value, index) => (
                <Header key={index} backgroundColor={backgroundColor} value={value} />
            ))}
        </div>
    )
}

const Panels = ({ alignment, panelValues, gridTemplate, userSolution, potentialSolutions }) =>
    <div style={{ ...styles.panels, ...gridTemplate }}>
        {panelValues.map((headerValues, index) => (
            <Panel
                alignment={alignment}
                key={index}
                headerValues={headerValues}
                userSolution={userSolution[index]}
                possibleSolutions={potentialSolutions[index]}
            />
        ))}
    </div>

const RowHeaders = ({ userSolution }) => {
    const gridTemplate = { gridTemplateRows: `repeat(${rowHeaderValues.length}, 1fr)` };
    const vertical = { gridAutoFlow: "column" };
    return (
        <div style={styles.rowHeaders}>
            <Panels
                alignment={vertical}
                panelValues={rowHeaderValues}
                gridTemplate={gridTemplate}
                userSolution={userSolution}
                potentialSolutions={rowsPotentialSolutions} />
        </div>
    )
}

const ColumnHeaders = ({ userSolution }) => {
    const gridTemplate = { gridTemplateColumns: `repeat(${columHeaderValues.length}, 1fr)` };
    return (
        <div style={styles.columnHeaders}>
            <Panels
                panelValues={columHeaderValues}
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

export default function Headers({ userSolution }) {
    const hChunks = chunk(userSolution, columHeaderValues.length);
    const vChunks = verticalChunk(hChunks, rowHeaderValues.length);
    return (
        <>
            <ColumnHeaders userSolution={vChunks} />
            <RowHeaders userSolution={hChunks} />
        </>
    )
} 