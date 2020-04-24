import React from 'react';
import { HEADER_COLORS } from './Constants';
import { useSelector } from 'react-redux';
import { selectAnswerRows, selectAnswerColumns } from './features/answerSlice';
import { selectRowValues, selectColumnValues } from './features/gameSlice';
import { selectRowsValidation, selectColumnValidation } from './features/validationSlice';
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

const Header = ({ headerValues, userAnswer, valid, alignment }) => {
    const backgroundColor = valid
        ? HEADER_COLORS.valid
        : valid === undefined
            ? HEADER_COLORS.valid
            : HEADER_COLORS.invalid;

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

const Headers = ({ alignment, headersValues, gridTemplate, userAnswer, validations }) => (
    <div style={{ ...styles.headers, ...gridTemplate }}>
        {headersValues.map((headerValues, index) => (
            <Header
                alignment={alignment}
                key={index}
                headerValues={headerValues}
                userAnswer={userAnswer[index]}
                valid={validations[index]}
            />
        ))}
    </div>
)

const RowHeaders = ({ userAnswer }) => {
    const rowHeaderValues = useSelector(selectRowValues);
    const rowsValidation = useSelector(selectRowsValidation);
    const gridTemplate = { gridTemplateRows: `repeat(${rowHeaderValues.length}, 1fr)` };
    const vertical = { gridAutoFlow: "column" };
    return (
        <div style={styles.rowHeaders}>
            <Headers
                alignment={vertical}
                headersValues={rowHeaderValues}
                gridTemplate={gridTemplate}
                userAnswer={userAnswer}
                validations={rowsValidation} />
        </div>
    )
}

const ColumnHeaders = ({ userAnswer }) => {
    const columnHeaderValues = useSelector(selectColumnValues);
    const columnsValidation = useSelector(selectColumnValidation);
    const gridTemplate = { gridTemplateColumns: `repeat(${columnHeaderValues.length}, 1fr)` };
    return (
        <div style={styles.columnHeaders}>
            <Headers
                headersValues={columnHeaderValues}
                gridTemplate={gridTemplate}
                userAnswer={userAnswer}
                validations={columnsValidation} />
        </div>
    )
}

export default function HeadersInformation({ length }) {
    const userAnswerRows = useSelector(selectAnswerRows);
    const userAnswerColumns = useSelector(selectAnswerColumns);

    return (
        <>
            <ColumnHeaders userAnswer={userAnswerColumns} />
            <RowHeaders userAnswer={userAnswerRows} />
        </>
    )
} 