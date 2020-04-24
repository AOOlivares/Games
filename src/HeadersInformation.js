import React from 'react';
import { useSelector } from 'react-redux';
import { isUserSolutionPotentiallyValid } from './HeadersInformationUtils';
import { selectAnswer } from './features/answerSlice';
import { selectRowValues, selectColumnValues, selectRowsPossibilities, selectColumnPossibilities } from './features/gameSlice';

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
    const areTheSameStyle = isUserSolutionPotentiallyValid(userAnswer, possibleSolutions);
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
    const rowHeaderValues = useSelector(selectRowValues);
    const rowPossibilities = useSelector(selectRowsPossibilities);
    const gridTemplate = { gridTemplateRows: `repeat(${rowHeaderValues.length}, 1fr)` };
    const vertical = { gridAutoFlow: "column" };
    return (
        <div style={styles.rowHeaders}>
            <Headers
                alignment={vertical}
                headersValues={rowHeaderValues}
                gridTemplate={gridTemplate}
                userAnswer={userAnswer}
                potentialSolutions={rowPossibilities} />
        </div>
    )
}

const ColumnHeaders = ({ userAnswer }) => {
    const columnHeaderValues = useSelector(selectColumnValues);
    const columnPossibilities = useSelector(selectColumnPossibilities);
    const gridTemplate = { gridTemplateColumns: `repeat(${columnHeaderValues.length}, 1fr)` };
    return (
        <div style={styles.columnHeaders}>
            <Headers
                headersValues={columnHeaderValues}
                gridTemplate={gridTemplate}
                userAnswer={userAnswer}
                potentialSolutions={columnPossibilities} />
        </div>
    )
}

const verticalChunks = (horizontalChunks, columns) => {
    const vChunks = [];
    for (let index = 0; index < columns; index++) {
        vChunks.push(horizontalChunks.map((v, i, array) => array[i][index]))
    }
    return vChunks;
}

export default function HeadersInformation({ length }) {
    const userAnswer = useSelector(selectAnswer);
    const vChunks = verticalChunks(userAnswer, length);

    return (
        <>
            <ColumnHeaders userAnswer={vChunks} />
            <RowHeaders userAnswer={userAnswer} />
        </>
    )
} 