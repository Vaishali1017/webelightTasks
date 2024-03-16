const GITHUB_API_URL = 'https://api.github.com';
export const fetchReposFromAPI = async (page) => {
    const response = await fetch(`${GITHUB_API_URL}/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${page}`);
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
        last_pushed: repo.pushed_at,
        owner: {
            username: repo.owner.login,
            avatar: repo.owner.avatar_url,
        },
    }));
};
