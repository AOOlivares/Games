import { createSlice } from '@reduxjs/toolkit';
import { rowValuesReducer, calculateArrayPossibilities } from '../HeadersInformationUtils';
import { CLICKTYPES, HIT_COLORS } from '../Constants';

export const rowsSlice = createSlice({
    name: 'rows',
    initialState: {
        values: [[]],
        possibilities: [[]],
        answer: [[]],
    },
    reducers: {
        resetRowsAnswer: (state, action) => {
            state.answer = action.payload.map((subMatrix) => subMatrix.map(() => ({ hited: false, color: HIT_COLORS.empty, value: '' })))
        },
        setRowsValues: (state, action) => {
            state.values = action.payload;
        },
        setRowsPossibilities: (state, action) => {
            state.possibilities = action.payload;
        },
        setRowsAnswerHit: (state, action) => {
            const { type, iX, iY } = action.payload;
            switch (type) {
                case CLICKTYPES.Hit:
                    state.answer[iX][iY] = { hitType: type, hited: true, value: '', color: HIT_COLORS.hit };
                    break;
                case CLICKTYPES.Cross:
                    state.answer[iX][iY] = { hitType: type, hited: true, value: CLICKTYPES.Cross, color: HIT_COLORS.hit }
                    break;
                case CLICKTYPES.Unknown:
                    state.answer[iX][iY] = { hitType: type, hited: true, value: CLICKTYPES.Unknown, color: HIT_COLORS.hit }
                    break;
                case CLICKTYPES.Clear:
                    state.answer[iX][iY] = { hited: false, value: '', color: HIT_COLORS.empty }
                    break;
                default:
                    break;
            }
        }
    },
});

export const { resetRowsAnswer, setRowsValues, setRowsAnswerHit, setRowsPossibilities } = rowsSlice.actions;

export const selectRowsValues = state => state.rows.values;
export const selectRowsAnswer = state => state.rows.answer;
export const selectRowsPossibilities = state => state.rows.possibilities;

export default rowsSlice.reducer;

export const setRows = (matrix) => dispatch => {
    dispatch(resetRowsAnswer(matrix));
    const rowValues = rowValuesReducer(matrix);
    dispatch(setRowsValues(rowValues));
    const rowPossibilities = calculateArrayPossibilities(rowValues, matrix[0].length);
    dispatch(setRowsPossibilities(rowPossibilities));
}

