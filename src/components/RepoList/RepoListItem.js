// RepoListItem.js
import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

const RepoListItem = ({ repo }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{repo.name}</Typography>
                <Typography variant="body1" color="textSecondary">{repo.description}</Typography>
                <Box display="flex" alignItems="center" mt={1}>
                    <Typography variant="body2">Stars: {repo.stars}</Typography>
                    <Typography variant="body2" ml={2}>Issues: {repo.issues}</Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={1}>
                    <Avatar alt={repo.owner.username} src={repo.owner.avatar} />
                    <Typography variant="body2" ml={1}>{repo.owner.username}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default RepoListItem;
