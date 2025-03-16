import { SuccessResponse } from "../../types/api-general";
import  {CreateTaskRequest, TaskResponse, EditTaskRequest} from "../../types/api-tasks";
import { axiosInstance } from "./axios-config";

const TASKS = "/api/tasks";
const TASK_BY_ID = (taskId: string) => `/api/tasks/${taskId}`;


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


export { createTask, getAllTasks, removeTaskById, editTaskById, getTaskById, taskLevel };