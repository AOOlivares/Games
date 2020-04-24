import React from 'react';
import { useSelector } from 'react-redux';
import * as Constants from './Constants';
import { HeadersInformationProperties, HeaderHelperMethods } from './HeadersInformationUtils';
import { selectAnswer } from './features/answerSlice';

const headersInfoProperties = HeadersInformationProperties(Constants.MATRIX);
const headerHelperMethods = HeaderHelperMethods();

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

const Panel = ({ backgroundColor, value, }) => <div style={{ ...styles.panel, backgroundColor: backgroundColor }}>{value}</div>;

const Header = ({ headerValues, userAnswer, possibleSolutions, alignment }) => {
    const areTheSameStyle = headerHelperMethods.isUserSolutionPotentiallyValid(userAnswer, possibleSolutions);
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

const Headers = ({ alignment, headersValues, gridTemplate, userAnswer, potentialSolutions }) => (
    <div style={{ ...styles.headers, ...gridTemplate }}>
        {headersValues.map((headerValues, index) => (
            <Header
                alignment={alignment}
                key={index}
                headerValues={headerValues}
                userAnswer={userAnswer[index]}
                possibleSolutions={potentialSolutions[index]}
            />
        ))}
    </div>
)

const RowHeaders = ({ userAnswer }) => {
    const gridTemplate = { gridTemplateRows: `repeat(${headersInfoProperties.rowHeaderValues.length}, 1fr)` };
    const vertical = { gridAutoFlow: "column" };
    return (
        <div style={styles.rowHeaders}>
            <Headers
                alignment={vertical}
                headersValues={headersInfoProperties.rowHeaderValues}
                gridTemplate={gridTemplate}
                userAnswer={userAnswer}
                potentialSolutions={headersInfoProperties.rowsPotentialSolutions} />
        </div>
    )
}

const ColumnHeaders = ({ userAnswer }) => {
    const gridTemplate = { gridTemplateColumns: `repeat(${headersInfoProperties.columHeaderValues.length}, 1fr)` };
    return (
        <div style={styles.columnHeaders}>
            <Headers
                headersValues={headersInfoProperties.columHeaderValues}
                gridTemplate={gridTemplate}
                userAnswer={userAnswer}
                potentialSolutions={headersInfoProperties.columnsPotentialSolutions} />
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

export default function HeadersInformation() {
    const userAnswer = useSelector(selectAnswer);

    const hChunks = chunk(userAnswer, headersInfoProperties.columHeaderValues.length);
    const vChunks = verticalChunk(hChunks, Constants.MATRIX[0].length);
    return (
        <>
            <ColumnHeaders userAnswer={vChunks} />
            <RowHeaders userAnswer={hChunks} />
        </>
    )
} 