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

interface AddCriteriaRequest {
    description: string;
    weight: number;
}

interface CriteriaResponse {
    criteriaId: string;
    taskId: string;
    description: string;
    weight: number;
    createdAt: number;
}

interface EditCriteriaRequest {
    description: string;
    weight: number;
}

export type {CreateTaskRequest, TaskResponse, EditCriteriaRequest, CriteriaResponse, AddCriteriaRequest, EditTaskRequest};