import { createSlice } from '@reduxjs/toolkit';
import { CLICKTYPES, HIT_COLORS } from '../Constants';
import { validateColumns, validateRows, validatePuzzle } from './validationSlice';

export const answerSlice = createSlice({
    name: 'answer',
    initialState: {
        rows: [[]],
        columns: [[]]
    },
    reducers: {
        setAnswerToInitialState: (state, action) => {
            state.rows = action.payload.map((subMatrix) => subMatrix.map(() => ({ hited: false, color: HIT_COLORS.empty, value: '' })))
            state.columns = verticalChunks(action.payload, action.payload[0].length)
        },
        setHit: (state, action) => {
            const { type, iX, iY } = action.payload;
            switch (type) {
                case CLICKTYPES.Hit:
                    state.rows[iX][iY] = { hitType: type, hited: true, value: '', color: HIT_COLORS.hit };
                    state.columns[iY][iX] = { hitType: type, hited: true, value: '', color: HIT_COLORS.hit };
                    break;
                case CLICKTYPES.Cross:
                    state.rows[iX][iY] = { hitType: type, hited: true, value: CLICKTYPES.Cross, color: HIT_COLORS.hit }
                    state.columns[iY][iX] = { hitType: type, hited: true, value: CLICKTYPES.Cross, color: HIT_COLORS.hit }
                    break;
                case CLICKTYPES.Unknown:
                    state.rows[iX][iY] = { hitType: type, hited: true, value: CLICKTYPES.Unknown, color: HIT_COLORS.hit }
                    state.columns[iY][iX] = { hitType: type, hited: true, value: CLICKTYPES.Unknown, color: HIT_COLORS.hit }
                    break;
                case CLICKTYPES.Clear:
                    state.rows[iX][iY] = { hited: false, value: '', color: HIT_COLORS.empty }
                    state.columns[iY][iX] = { hited: false, value: '', color: HIT_COLORS.empty }
                    break;
                default:
                    break;
            }
        },
    },
});

export const { setHit, setAnswerToInitialState } = answerSlice.actions;

export const selectAnswerRows = state => state.answer.rows;
export const selectAnswerColumns = state => state.answer.columns;

export default answerSlice.reducer;

export const setUserHit = (payload) => dispatch => {
    dispatch(setHit(payload));
    dispatch(validateRows());
    dispatch(validateColumns());
    dispatch(validatePuzzle());
}


const verticalChunks = (horizontalChunks, columns) => {
    const vChunks = [];
    for (let index = 0; index < columns; index++) {
        vChunks.push(horizontalChunks.map((v, i, array) => array[i][index]))
    }
    return vChunks;
}