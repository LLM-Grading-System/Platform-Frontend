import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
    createTask, 
    getAllTasks, 
    getTaskById, 
    editTaskById, 
    removeTaskById, 
    addCriteriaToTask, 
    getCriteriaByTaskId, 
    editCriteriaById, 
    removeCriteriaById 
} from "../services/api/tasks";
import { CreateTaskRequest, EditTaskRequest, AddCriteriaRequest, EditCriteriaRequest, TaskResponse, CriteriaResponse } from "../types/api-tasks";
import { notifyError, showSuccess } from "../utils/notifications";
import { useNavigate } from "react-router";
import { getTaskPath, TASKS_PATH } from "../app/paths";
import { SuccessResponse } from "../types/api-general";

const useTasks = () => {
    return useQuery({
        queryKey: ["tasks"],
        queryFn: () => getAllTasks(),
        staleTime: 1000 * 60 * 5,
    });
};

const useTaskById = (taskId: string | undefined) => {
    return useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getTaskById(taskId as string),
        staleTime: 1000 * 60 * 5,
        enabled: !!taskId
    });
};

const useCreateTask = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (taskData: CreateTaskRequest) => createTask(taskData),
        onError: notifyError,
        onSuccess: (data: TaskResponse) => {
            queryClient.invalidateQueries({ queryKey: ["tasks"]});
            queryClient.setQueryData(["task", data.taskId], data);
            queryClient.setQueryData(["task", data.taskId, "criteria"], []);
            navigate(getTaskPath(data.taskId));
        },
    });
};

const useEditTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (task: {data: EditTaskRequest, taskId: string}) => editTaskById(task.taskId, task.data),
        onError: notifyError,
        onSuccess: (data: TaskResponse) => {
            queryClient.invalidateQueries({ queryKey: ["tasks"]});
            queryClient.setQueryData(["task", data.taskId], data);
            showSuccess("Задача обновлена");
        },
    });
};

const useRemoveTask = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (data: {taskId: string}) => removeTaskById(data.taskId),
        onError: notifyError,
        onSuccess: (data: SuccessResponse) => {
            showSuccess(data.message);
            queryClient.invalidateQueries({ queryKey: ["tasks"]});
            navigate(TASKS_PATH);
        },
    });
};

const useCriteriaByTaskId = (taskId: string | undefined) => {
    return useQuery({
        queryKey: ["task", taskId, "criteria"],
        queryFn: () => getCriteriaByTaskId(taskId as string),
        staleTime: 1000 * 60 * 5,
        enabled: !!taskId
    });
};

const useAddCriteriaToTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (criteria: {data: AddCriteriaRequest, taskId: string}) => addCriteriaToTask(criteria.taskId, criteria.data),
        onSuccess: (data: CriteriaResponse) => {
            queryClient.invalidateQueries({ queryKey: ["task", data.taskId, "criteria"]});
        },
    });
};

const useEditCriteria = (taskId: string, criteriaId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (criteriaData: EditCriteriaRequest) => editCriteriaById(taskId, criteriaId, criteriaData),
        onSuccess: (data: CriteriaResponse) => {
            queryClient.invalidateQueries({ queryKey: ["task", data.taskId, "criteria"]});
        },
    });
};

const useRemoveCriteria = (taskId: string | undefined) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: {criteriaId: string}) => removeCriteriaById(taskId as string, data.criteriaId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["task", taskId, "criteria"]});
        },
    });
};

export { 
    useTasks, 
    useTaskById, 
    useCreateTask, 
    useEditTask, 
    useRemoveTask, 
    useCriteriaByTaskId, 
    useAddCriteriaToTask, 
    useEditCriteria, 
    useRemoveCriteria 
};