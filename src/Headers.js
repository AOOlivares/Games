import React from 'react';
import HeaderPanels from './HeaderPanels';
import * as Constants from './Constants';

const rowHeadersStyle = {
    gridColumn: "1",
    gridRow: "2 / 4",
}

const VerticalHeaders = ({ headerValues, userSolution, potentialSolutions }) => {
    const gridTemplate = { gridTemplateRows: `repeat(${headerValues.length}, 1fr)` };
    const flow = { gridAutoFlow: "column" };
    return (
        <div style={rowHeadersStyle}>
            <HeaderPanels
                flow={flow}
                headerValues={headerValues}
                gridTemplate={gridTemplate}
                userSolution={userSolution}
                potentialSolutions={potentialSolutions} />
        </div>
    )
}

const columnHeadersStyle = {
    gridColumn: "2 / 4",
    gridRow: "1",
}

const HorizontalHeaders = ({ headerValues, userSolution, potentialSolutions }) => {
    const gridTemplate = { gridTemplateColumns: `repeat(${headerValues.length}, 1fr)` };
    return (
        <div style={columnHeadersStyle}>
            <HeaderPanels
                headerValues={headerValues}
                gridTemplate={gridTemplate}
                userSolution={userSolution}
                potentialSolutions={potentialSolutions} />
        </div>
    )
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
const rowHeaderValues = rowReducer();
const columHeaderValues = columnReducer();
const rowsPotentialSolutions = rowHeaderValues.map(x => calculatePosibilities(Constants.MATRIX[0].length, x));
const columnsPotentialSolutions = columHeaderValues.map(x => calculatePosibilities(Constants.MATRIX.length, x));

export default function Headers({ userSolution }) {
    const hChunks = chunk(userSolution, columHeaderValues.length);
    const vChunks = verticalChunk(hChunks, rowHeaderValues.length);
    return (
        <>
            <HorizontalHeaders headerValues={columHeaderValues} userSolution={vChunks} potentialSolutions={columnsPotentialSolutions} />
            <VerticalHeaders headerValues={rowHeaderValues} userSolution={hChunks} potentialSolutions={rowsPotentialSolutions} />
        </>
    )
} 