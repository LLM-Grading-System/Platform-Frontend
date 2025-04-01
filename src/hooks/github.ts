import {useQuery} from "@tanstack/react-query";
import { getReadmeByGitHubURL } from "../services/api/github";


const useReadme = (taskGitHubURL: string | undefined) => {
  return useQuery(
        {
            queryKey: ["readme", taskGitHubURL],
            queryFn: () => taskGitHubURL && getReadmeByGitHubURL(taskGitHubURL),
            staleTime: 1000 * 60 * 10,
            enabled: taskGitHubURL !== undefined
        }
    )
};

export {useReadme};