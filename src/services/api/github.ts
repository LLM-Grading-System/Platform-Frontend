import axios from "axios";


function extractRepoInfo(url: string): { organization: string; repository: string } {
    const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
    const match = url.match(regex);

    if (match) {
        return {
            organization: match[1],
            repository: match[2]
        };
    }

    return  {organization: "", repository: ""};
}

function getContentURL (organizationName: string, repoName: string): string {
    return `https://raw.githubusercontent.com/${organizationName}/${repoName}/main/README.md`
}

const getReadmeByGitHubURL = async (gitubURL: string): Promise<string> => {
    const {organization, repository } = extractRepoInfo(gitubURL);
    const url = getContentURL(organization, repository)
    const response = await axios.get<string>(url);
    return response.data;
};

export {getReadmeByGitHubURL};