// githubAPI.js
const GITHUB_API_URL = 'https://api.github.com';

export const fetchReposFromAPI = async () => {
    console.log("hiii")
    const response = await fetch(`${GITHUB_API_URL}/search/repositories?q=created:>2022-02-01&sort=stars&order=desc`);
    console.log("3",response)
    if (!response.ok) {
        throw new Error('Failed to fetch repositories');
    }
    const data = await response.json();
    return data.items.map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        issues: repo.open_issues_count,
        owner: {
            username: repo.owner.login,
            avatar: repo.owner.avatar_url,
        },
    }));
};
