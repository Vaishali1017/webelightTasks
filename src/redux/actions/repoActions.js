import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchReposFromAPI } from '../../services/githubApi';

export const fetchRepos = createAsyncThunk('repos/fetchRepos', async (page) => {
    const repos = await fetchReposFromAPI(page);
    return repos;
});
