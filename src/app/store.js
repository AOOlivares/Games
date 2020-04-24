import { configureStore } from '@reduxjs/toolkit';
import userAnswerReducer from '../features/answerSlice';
import clickTypeReducer from '../features/clickTypeSlice';
import validationReducer from '../features/validationSlice';
export default configureStore({
    reducer: {
        answer: userAnswerReducer,
        clickType: clickTypeReducer,
        validation: validationReducer,
    },
});
