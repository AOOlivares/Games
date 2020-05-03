import { createSlice } from '@reduxjs/toolkit';
import { HIT, EMPTY, HIT_COLORS, CLICKTYPES } from '../utils/Constants';
import { resetValidation, validatePuzzle } from './validationSlice';
import { setRows } from './rowsSlice';
import { setColumns } from './columnsSlice';

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        puzzle: [
            [EMPTY, EMPTY, HIT],
            [HIT, EMPTY, EMPTY],
            [HIT, HIT, EMPTY],
        ],
        game: [[]]
    },
    reducers: {
        setNewPuzzle: (state, action) => {
            state.puzzle = action.payload
        },
        initGame: (state, action) => {
            state.game = action.payload.map((subMatrix) => subMatrix.map(() => ({ hited: false, color: HIT_COLORS.empty, value: '' })))
        },
        setGameHit: (state, action) => {
            const { type, iX, iY } = action.payload;
            switch (type) {
                case CLICKTYPES.Hit:
                    state.game[iX][iY] = { hitType: type, hited: true, value: '', color: HIT_COLORS.hit };
                    break;
                case CLICKTYPES.Cross:
                    state.game[iX][iY] = { hitType: type, hited: true, value: CLICKTYPES.Cross, color: HIT_COLORS.empty }
                    break;
                case CLICKTYPES.Unknown:
                    state.game[iX][iY] = { hitType: type, hited: true, value: CLICKTYPES.Unknown, color: HIT_COLORS.hit }
                    break;
                case CLICKTYPES.Clear:
                    state.game[iX][iY] = { hited: false, value: '', color: HIT_COLORS.empty }
                    break;
                default:
                    break;
            }
        },
        setAutoCompleteRow: (state, action) => {
            const { row, index } = action.payload;
            state.game[index] = row;
        },
        setAutoCompleteColumn: (state, action) => {
            const { column, index } = action.payload;
            state.game.forEach((row, iX) => {
                state.game[iX][index] = column[iX];
            });
        }
    }
});

export const { initGame, setGameHit, setAutoCompleteRow, setAutoCompleteColumn, setNewPuzzle } = gameSlice.actions;

export const selectMatrix = state => state.game.puzzle;
export const selectGame = state => state.game.game;
export const selectNumberOfRows = state => state.game.puzzle.length
export const selectNumberOfColumns = state => state.game.puzzle[0].length

export default gameSlice.reducer;

export const initiateGame = () => (dispatch, getState) => {
    const { puzzle } = getState().game;
    dispatch(initGame(puzzle))
    dispatch(resetValidation())
    dispatch(setRows(puzzle));
    dispatch(setColumns(puzzle));
    dispatch(validatePuzzle());
}

export const newPuzzle = (difficulty) => dispatch => {
    const { x, y } = newGameLengths(difficulty);
    let puzzle = [];
    for (let i = 0; i < x; i++) {
        let subArray = [];
        for (let subI = 0; subI < y; subI++) {
            const number = getRandomInt(1, 10);
            if (isOdd(number)) subArray.push(HIT)
            else subArray.push(EMPTY)
        }
        puzzle.push(subArray)
    }
    dispatch(setNewPuzzle(puzzle));
    dispatch(initiateGame());
}

const newGameLengths = (difficulty) => {
    switch (difficulty) {
        case 'medium':
            return { x: 10, y: 10 };
        case 'hard':
            return { x: 10, y: 15 };
        default:
            return { x: 5, y: 5 };
    }
}

const isOdd = (num) => num % 2;

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}