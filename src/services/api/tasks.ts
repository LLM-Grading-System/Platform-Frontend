import { SuccessResponse } from "../../types/api-general";
import  {CreateTaskRequest, TaskResponse, EditCriteriaRequest, CriteriaResponse, AddCriteriaRequest, EditTaskRequest} from "../../types/api-tasks";
import { axiosInstance } from "./axios-config";

const TASKS = "/api/tasks";
const TASK_BY_ID = (taskId: string) => `/api/tasks/${taskId}`;
const TASK_CRITERIA = (taskId: string) => `/api/tasks/${taskId}/criteria`;
const TASK_CRITERION_BY_ID = (taskId: string, criterionId: string) => `/api/tasks/${taskId}/criteria/${criterionId}`;


const taskLevel = {
    high: "high",
    medium: "medium",
    low: "low",
}


const createTask = async (taskData: CreateTaskRequest): Promise<TaskResponse> => {
    const response = await axiosInstance.post<TaskResponse>(TASKS, taskData);
    return response.data;
};

const getAllTasks = async (): Promise<TaskResponse[]> => {
    const response = await axiosInstance.get<TaskResponse[]>(TASKS);
    return response.data;
};

const getTaskById = async (taskId: string): Promise<TaskResponse> => {
    const response = await axiosInstance.get<TaskResponse>(TASK_BY_ID(taskId));
    return response.data;
};

const editTaskById = async (taskId: string, taskData: EditTaskRequest): Promise<TaskResponse> => {
    const response = await axiosInstance.put<TaskResponse>(TASK_BY_ID(taskId), taskData);
    return response.data;
};

const removeTaskById = async (taskId: string): Promise<SuccessResponse> => {
    const response = await axiosInstance.delete(TASK_BY_ID(taskId));
    return response.data;
};

const addCriteriaToTask = async (taskId: string, criteriaData: AddCriteriaRequest): Promise<CriteriaResponse> => {
    const response = await axiosInstance.post<CriteriaResponse>(TASK_CRITERIA(taskId), criteriaData);
    return response.data;
};

const getCriteriaByTaskId = async (taskId: string): Promise<CriteriaResponse[]> => {
    const response = await axiosInstance.get<CriteriaResponse[]>(TASK_CRITERIA(taskId));
    return response.data;
};

const editCriteriaById = async (taskId: string, criteriaId: string, criteriaData: EditCriteriaRequest): Promise<CriteriaResponse> => {
    const response = await axiosInstance.put<CriteriaResponse>(TASK_CRITERION_BY_ID(taskId, criteriaId), criteriaData);
    return response.data;
};

const removeCriteriaById = async (taskId: string, criteriaId: string): Promise<SuccessResponse> => {
    const response = await axiosInstance.delete(TASK_CRITERION_BY_ID(taskId, criteriaId));
    return response.data;
};

export { createTask, removeCriteriaById, editCriteriaById, getCriteriaByTaskId, getAllTasks, addCriteriaToTask, removeTaskById, editTaskById, getTaskById, taskLevel };