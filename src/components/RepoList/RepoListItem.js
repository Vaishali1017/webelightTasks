import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Avatar, Box, Chip, IconButton, Menu, MenuItem } from '@mui/material';
import moment from 'moment';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TotalChangesGraph  from "../Graphs/TotalChangesGraph";
import axios from "axios";
import ContributorsGraph from "../Graphs/ContributorsGraph";

const RepoListItem = ({ repo }) => {
    const [expanded, setExpanded] = useState(false); // State variable to manage expand/collapse
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [graphData, setGraphData] = useState(null);

    const lastPushedTime = moment(repo.last_pushed);
    const timeInterval = moment.duration(moment().diff(lastPushedTime)).humanize(true);


    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setExpanded(!expanded);

    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setExpanded(expanded);

    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        handleMenuClose();
    };
    console.log("sel",selectedOption)
    useEffect(() => {
        async function fetchData() {
            try {
                let apiUrl;
                console.log("22")
                if (selectedOption === 'Commits') {
                    apiUrl = `https://api.github.com/repos/${repo.owner.username}/${repo.name}/stats/commit_activity`;
                } else if (selectedOption === 'Additions' || selectedOption === 'Deletions') {
                    apiUrl = `https://api.github.com/repos/${repo.owner.username}/${repo.name}/stats/code_frequency`;
                }
                console.log("API URL:", apiUrl);

                axios.get(apiUrl)
                    .then(response => {
                        console.log("res",response)
                        setGraphData(response.data);

                    })
                    .catch(error => {
                        console.error('Error fetching data', error);
                    });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        if (expanded) {
            fetchData();
        }
    }, [expanded, repo, selectedOption]);

    return (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center">
                    <Avatar alt={repo.owner.username} src={repo.owner.avatar} variant="square" />
                </Box>

                <Box ml={10} mt={-5}>
                    <Typography variant="h6">{repo.name}</Typography>
                </Box>
                <Typography variant="body1" color="textSecondary" ml={10}>{repo.description}</Typography>
                <Box display="flex" alignItems="center" mt={1} ml={10}>
                    <Chip label={`Stars: ${repo.stars}`} color="primary" />
                    <Box ml={4}>
                        <Chip label={`Issues: ${repo.issues}`} color="secondary" />
                    </Box>
                    <Box ml={4}>
                        <Typography variant="body2">Last Pushed: {timeInterval} ago by {repo.owner.username}</Typography>
                    </Box>
                    <Box ml="auto">
                        <IconButton onClick={handleMenuOpen}>
                            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />} {/* Toggle expand/collapse icon */}
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => handleOptionSelect('Commits')}>Commits</MenuItem>
                            <MenuItem onClick={() => handleOptionSelect('Additions')}>Additions</MenuItem>
                            <MenuItem onClick={() => handleOptionSelect('Deletions')}>Deletions</MenuItem>
                        </Menu>
                    </Box>
                </Box>
                {expanded && graphData && (
                    <>
                        <ContributorsGraph data={graphData} selectedOption={selectedOption} />

                        <TotalChangesGraph data={graphData} selectedOption={selectedOption} />
                    </>

                )}
            </CardContent>
        </Card>
    );
};

export default RepoListItem;
