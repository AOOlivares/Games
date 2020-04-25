import { createSlice } from '@reduxjs/toolkit';
import { CLICKTYPES, HIT_COLORS } from '../Constants';
import { columnValuesReducer, calculateArrayPossibilities } from '../HeadersInformationUtils';

export const columnsSlice = createSlice({
    name: 'columns',
    initialState: {
        values: [[]],
        possibilities: [[]],
        answer: [[]]
    },
    reducers: {
        resetColumnsAnswer: (state, action) => {
            state.answer = verticalChunks(action.payload, action.payload[0].length)
        },
        setColumnsValues: (state, action) => {
            state.values = action.payload;
        },
        setColumnsPossibilities: (state, action) => {
            state.possibilities = action.payload;
        },
        setColumnsAnswerHit: (state, action) => {
            const { type, iX, iY } = action.payload;
            switch (type) {
                case CLICKTYPES.Hit:
                    state.answer[iY][iX] = { hitType: type, hited: true, value: '', color: HIT_COLORS.hit };
                    break;
                case CLICKTYPES.Cross:
                    state.answer[iY][iX] = { hitType: type, hited: true, value: CLICKTYPES.Cross, color: HIT_COLORS.hit }
                    break;
                case CLICKTYPES.Unknown:
                    state.answer[iY][iX] = { hitType: type, hited: true, value: CLICKTYPES.Unknown, color: HIT_COLORS.hit }
                    break;
                case CLICKTYPES.Clear:
                    state.answer[iY][iX] = { hited: false, value: '', color: HIT_COLORS.empty }
                    break;
                default:
                    break;
            }
        },
    },
});

export const { resetColumnsAnswer, setColumnsValues, setColumnsPossibilities, setColumnsAnswerHit } = columnsSlice.actions;

export const selectColumnValues = state => state.columns.values;
export const selectColumnsAnswer = state => state.columns.answer;
export const selectColumnPossibilities = state => state.columns.possibilities;

export default columnsSlice.reducer;

export const setColumns = (matrix) => dispatch => {
    dispatch(resetColumnsAnswer(matrix));
    const columnValues = columnValuesReducer(matrix);
    dispatch(setColumnsValues(columnValues));
    const columnPossibilities = calculateArrayPossibilities(columnValues, matrix.length);
    dispatch(setColumnsPossibilities(columnPossibilities));
}

const verticalChunks = (horizontalChunks, columns) => {
    const vChunks = [];
    for (let index = 0; index < columns; index++) {
        vChunks.push(horizontalChunks.map((v, i, array) => array[i][index]))
    }
    return vChunks;
}
