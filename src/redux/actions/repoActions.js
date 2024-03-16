// repoActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchReposFromAPI } from '../../services/githubApi';

export const fetchRepos = createAsyncThunk('repos/fetchRepos', async () => {
    const repos = await fetchReposFromAPI();
    console.log("1",repos)
    return repos;
});
