// HomePage.js
import React, { useEffect } from 'react';
import { Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import RepoList from '../components/RepoList/RepoList';
import { fetchRepos } from '../redux/actions/repoActions';

const HomePage = () => {
    const dispatch = useDispatch();
    const repos = useSelector(state => state.repos);

    useEffect(() => {
        dispatch(fetchRepos());
    }, [dispatch]);

    return (
        <Container maxWidth="md">
            <Typography variant="h2" component="h1" gutterBottom>
                Most Starred GitHub Repos
            </Typography>
            <RepoList repos={repos} />
        </Container>
    );
};

export default HomePage;
