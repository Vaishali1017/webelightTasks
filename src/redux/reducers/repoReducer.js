// repoReducer.js
import { createReducer } from '@reduxjs/toolkit';
import { fetchRepos } from '../actions/repoActions';

const initialState = [];

const repoReducer = createReducer(initialState, builder => {
    builder
        .addCase(fetchRepos.fulfilled, (state, action) => {
            return action.payload;
        });
});

export default repoReducer;
