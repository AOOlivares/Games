import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../features/gameSlice';
import userReducer from '../features/userSlice';
import validationReducer from '../features/validationSlice';
import rowsReducer from '../features/rowsSlice';
import columnsReducer from '../features/columnsSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        game: gameReducer,
        rows: rowsReducer,
        columns: columnsReducer,
        validation: validationReducer,
    },
});
