import { configureStore } from '@reduxjs/toolkit';
import userSolutionReducer from '../features/userSolutionSlice';
export default configureStore({
    reducer: {
        userSolution: userSolutionReducer
    },
});
