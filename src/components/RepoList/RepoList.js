// RepoList.js
import React from 'react';
import { Grid } from '@mui/material';
import RepoListItem from './RepoListItem';

const RepoList = ({ repos }) => {
    return (
        <Grid container spacing={2}>
            {repos.map(repo => (
                <Grid item key={repo.id} xs={12} sm={6} md={4}>
                    <RepoListItem repo={repo} />
                </Grid>
            ))}
        </Grid>
    );
};

export default RepoList;
