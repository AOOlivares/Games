import React from 'react';
import { useSelector } from 'react-redux';
import { HEADER_COLORS } from '../utils/Constants';
import { selectRowsValues, selectRowsAnswer } from '../features/rowsSlice';
import { selectColumnValues, selectColumnsAnswer } from '../features/columnsSlice';
import { selectRowsValidation, selectColumnValidation } from '../features/validationSlice';
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
        gridRow: "2 / 8",
    },
    columnHeaders: {
        gridColumn: "2 / 8",
        gridRow: "1",
    }
}

const Panel = ({ backgroundColor, value, }) => <div style={{ ...styles.panel, backgroundColor: backgroundColor }}>{value}</div>;

const Header = ({ headerValues, valid, alignment }) => {
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

const Headers = ({ alignment, headersValues, gridTemplate, validations }) => (
    <div style={{ ...styles.headers, ...gridTemplate }}>
        {headersValues.map((headerValues, index) => (
            <Header
                alignment={alignment}
                key={index}
                headerValues={headerValues}
                valid={validations[index]}
            />
        ))}
    </div>
)

const RowHeaders = () => {
    const rowHeaderValues = useSelector(selectRowsValues);
    const rowsValidation = useSelector(selectRowsValidation);
    const gridTemplate = { gridTemplateRows: `repeat(${rowHeaderValues.length}, 1fr)` };
    const vertical = { gridAutoFlow: "column" };
    return (
        <div style={styles.rowHeaders}>
            <Headers
                alignment={vertical}
                headersValues={rowHeaderValues}
                gridTemplate={gridTemplate}
                validations={rowsValidation} />
        </div>
    )
}

const ColumnHeaders = () => {
    const columnHeaderValues = useSelector(selectColumnValues);
    const columnsValidation = useSelector(selectColumnValidation);
    const gridTemplate = { gridTemplateColumns: `repeat(${columnHeaderValues.length}, 1fr)` };
    return (
        <div style={styles.columnHeaders}>
            <Headers
                headersValues={columnHeaderValues}
                gridTemplate={gridTemplate}
                validations={columnsValidation} />
        </div>
    )
}

export default function HeadersInformation() {
    const userAnswerRows = useSelector(selectRowsAnswer);
    const userAnswerColumns = useSelector(selectColumnsAnswer);

    return (
        <>
            <ColumnHeaders userAnswer={userAnswerColumns} />
            <RowHeaders userAnswer={userAnswerRows} />
        </>
    )
} 