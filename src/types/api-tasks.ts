interface CreateTaskRequest {
    name: string;
    systemInstructions: string;
    ideas: string;
    githubRepoUrl: string;
    level: string;
    tags: string[];
    isDraft: boolean;
}

interface TaskResponse {
    taskId: string;
    name: string;
    systemInstructions: string;
    ideas: string;
    githubRepoUrl: string;
    level: string;
    tags: string[];
    isDraft: boolean;
}

interface EditTaskRequest {
    name: string;
    systemInstructions: string;
    ideas: string;
    githubRepoUrl: string;
    level: string;
    tags: string[];
    isDraft: boolean;
}
export type {CreateTaskRequest, TaskResponse, EditTaskRequest};