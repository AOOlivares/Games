import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../features/gameSlice';
import userAnswerReducer from '../features/answerSlice';
import clickTypeReducer from '../features/clickTypeSlice';
import validationReducer from '../features/validationSlice';

export default configureStore({
    reducer: {
        game: gameReducer,
        answer: userAnswerReducer,
        clickType: clickTypeReducer,
        validation: validationReducer,
    },
});
