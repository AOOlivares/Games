import { createSlice } from '@reduxjs/toolkit';
import { CLICKTYPES } from '../Constants';
const hitColors = {
    hit: '#75daad',
    empty: '#ffc299'
}
export const answerSlice = createSlice({
    name: 'answer',
    initialState: {
        value: [[]]
    },
    reducers: {
        setAnswerToInitialState: (state, action) => {
            state.value = action.payload.map((subMatrix) => subMatrix.map(() => ({ hited: false, color: hitColors.empty, value: '' })))
        },
        setHit: (state, action) => {
            const { type, iX, iY } = action.payload;
            switch (type) {
                case CLICKTYPES.Hit:
                    state.value[iX][iY] = { hitType: type, hited: true, value: '', color: hitColors.hit };
                    break;
                case CLICKTYPES.Cross:
                    state.value[iX][iY] = { hitType: type, hited: true, value: CLICKTYPES.Cross, color: hitColors.hit }
                    break;
                case CLICKTYPES.Unknown:
                    state.value[iX][iY] = { hitType: type, hited: true, value: CLICKTYPES.Unknown, color: hitColors.hit }
                    break;
                case CLICKTYPES.Clear:
                    state.value[iX][iY] = { hited: false, value: '', color: hitColors.empty }
                    break;
                default:
                    break;
            }
        },
    },
});

export const { setHit, setAnswerToInitialState } = answerSlice.actions;

export const selectAnswer = state => state.answer.value;

export default answerSlice.reducer;

