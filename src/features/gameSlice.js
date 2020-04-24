import { createSlice } from '@reduxjs/toolkit';
import { HIT, EMPTY } from '../Constants';
export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        matrix: [
            [HIT, EMPTY, HIT],
            [HIT, EMPTY, EMPTY]
        ]
    },
    reducers: {
        increment: state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount } = gameSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectMatrix = state => state.matrix;
export const selectBoardCells = state => [].concat(...state.matrix);

export default gameSlice.reducer;
