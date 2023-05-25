import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import {configureStore} from "@reduxjs/toolkit";
import gameSlice from "./slices/gameSlice";


const rootReducer = combineReducers({
    game: gameSlice.reducer
});

const persistedState = loadFromLocalStorage();
const middleware = [thunk];

const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: true,
    preloadedState: persistedState,
});

store.subscribe(() => {
    saveToLocalStorage({
        game: store.getState().game,
    });
});

export default store;