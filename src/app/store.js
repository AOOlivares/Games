import { configureStore } from '@reduxjs/toolkit';
import userAnswerReducer from '../features/answerSlice';
import clickTypeReducer from '../features/clickTypeSlice';
export default configureStore({
    reducer: {
        answer: userAnswerReducer,
        clickType: clickTypeReducer
    },
});
