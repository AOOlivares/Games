import { createSlice } from '@reduxjs/toolkit';
import { CLICKTYPES, MATRIX } from '../Constants';
export const answerSlice = createSlice({
    name: 'answer',
    initialState: {
        value: MATRIX.map((subMatrix) => subMatrix.map(() => ({ hited: false })))
    },
    reducers: {
        setHit: (state, action) => {
            const { type, iX, iY } = action.payload;
            switch (type) {
                case CLICKTYPES.Hit:
                    state.value[iX][iY] = { hitType: type, hited: true };
                    break;
                case CLICKTYPES.Cross:
                    state.value[iX][iY] = { hitType: type, hited: true }
                    break;
                case CLICKTYPES.Unknown:
                    state.value[iX][iY] = { hitType: type, hited: true }
                    break;
                case CLICKTYPES.Clear:
                    state.value[iX][iY] = { hited: false }
                    break;
                default:
                    break;
            }
        },
    },
});

export const { setHit } = answerSlice.actions;

export const selectAnswer = state => state.answer.value;

export default answerSlice.reducer;

