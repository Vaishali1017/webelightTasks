import React from 'react';
import {Card, CardContent, Typography, Avatar, Box, Chip} from '@mui/material';
import moment from 'moment';

const RepoListItem = ({ repo }) => {

    const lastPushedTime = moment(repo.last_pushed);
    const timeInterval = moment.duration(moment().diff(lastPushedTime)).humanize(true);

    return (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center">
                    <Avatar alt={repo.owner.username} src={repo.owner.avatar}
                            variant="square"

                    />
                </Box>

                <Box ml={7} mt={-5}>
                        <Typography variant="h6">{repo.name}</Typography>
                    </Box>
                <Typography variant="body1" color="textSecondary" ml={7}>{repo.description}</Typography>
                <Box display="flex" alignItems="center" mt={1} ml={7}>
                    <Chip label={`Stars: ${repo.stars}`} color="primary" />
                    <Box ml={4}> {/* Add space between Chips */}
                        <Chip label={`Issues: ${repo.issues}`} color="secondary" />
                    </Box>
                    <Box ml={4}> {/* Add space between Chips */}
                        <Typography variant="body2">Last Pushed: {timeInterval} ago by {repo.owner.username}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default RepoListItem;

