// store.js
import { configureStore } from '@reduxjs/toolkit';
import repoReducer from './reducers/repoReducer';

const store = configureStore({
    reducer: {
        repos: repoReducer,
    },
});

export default store;
