interface CreateTaskRequest {
    name: string;
    description: string;
    githubRepoUrl: string;
    level: string;
    tags: string[];
    isDraft: boolean;
}

interface TaskResponse {
    taskId: string;
    name: string;
    description: string;
    githubRepoUrl: string;
    level: string;
    tags: string[];
    isDraft: boolean;
}

interface EditTaskRequest {
    name: string;
    description: string;
    githubRepoUrl: string;
    level: string;
    tags: string[];
    isDraft: boolean;
}
export type {CreateTaskRequest, TaskResponse, EditTaskRequest};