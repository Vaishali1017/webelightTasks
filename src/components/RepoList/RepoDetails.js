import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TotalChangesGraph from '../Graphs/TotalChangesGraph'
import ContributorsGraph from '../Graphs/ContributorsGraph';

const RepoDetails = ({ owner, repo }) => {
    const [codeFrequency, setCodeFrequency] = useState([]);
    const [commitActivity, setCommitActivity] = useState([]);
    const [contributors, setContributors] = useState([]);
    const [selectedContributors, setSelectedContributors] = useState([]);

    useEffect(() => {
        axios.get(`https://api.github.com/repos/${owner}/${repo}/stats/code_frequency`)
            .then(response => {
                setCodeFrequency(response.data);
            })
            .catch(error => {
                console.error('Error fetching code frequency:', error);
            });

        axios.get(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`)
            .then(response => {
                setCommitActivity(response.data);
            })
            .catch(error => {
                console.error('Error fetching commit activity:', error);
            });

        axios.get(`https://api.github.com/repos/${owner}/${repo}/stats/contributors`)
            .then(response => {
                setContributors(response.data);
            })
            .catch(error => {
                console.error('Error fetching contributors:', error);
            });
    }, [owner, repo]);

    const handleContributorToggle = (contributorId) => {
        setSelectedContributors(prevSelected => {
            if (prevSelected.includes(contributorId)) {
                return prevSelected.filter(id => id !== contributorId);
            } else {
                return [...prevSelected, contributorId];
            }
        });
    };

    return (
        <div>
            {/*<h2>Total Changes</h2>*/}
            {/*<TotalChangesGraph data={codeFrequency} />*/}

            <h2>Contributors</h2>
            <ContributorsGraph data={contributors} selectedContributors={selectedContributors} onToggle={handleContributorToggle} />
        </div>
    );
};

export default RepoDetails;
