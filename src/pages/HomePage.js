import React, { useEffect, useRef, useState } from 'react';
import { Typography, Container, Card, CardContent, CardHeader } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import RepoList from '../components/RepoList/RepoList';
import { fetchRepos } from '../redux/actions/repoActions';

const HomePage = () => {
    const dispatch = useDispatch();
    const repos = useSelector(state => state.repos);
    const [loading, setLoading] = useState(false); // State to track loading status
    const page = useRef(1); // To keep track of the current page

    useEffect(() => {
        // Initial fetch for the first page
        dispatch(fetchRepos(page.current));
    }, [dispatch]);

    // Function to fetch more repos when reaching bottom of the page
    const handleScroll = () => {
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;

        if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
            // Set loading to true to prevent multiple API calls
            setLoading(true);

            // Increment page number and fetch more repos
            page.current++;
            dispatch(fetchRepos(page.current)).then(() => {
                // Reset loading once the API call is complete
                setLoading(false);
            });
        }
    };

    useEffect(() => {
        // Add scroll event listener when component mounts
        window.addEventListener('scroll', handleScroll);

        // Remove scroll event listener when component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Container maxWidth="md">
            <Card>
                <CardHeader
                    title="Most Starred GitHub Repos"
                    titleTypographyProps={{ variant: 'h4', textAlign: 'center' }}
                />
                <CardContent>
                    <RepoList repos={repos} />
                </CardContent>
            </Card>
        </Container>
    );
};

export default HomePage;
