const HOME_PATH = "/";
const LOGIN_PATH = "/login";
const TASKS_PATH = "/tasks"
const COMPLAINTS_PATH = "/complaints"
const TASK_PATH = "/tasks/:taskId";
const EDIT_TASK_PATH = "/tasks/:taskId/edit";
const NEW_TASK_PATH = "/new-task"

const getTaskPath = (taskId: string) => TASK_PATH.replace(":taskId", taskId);
const getEditTaskPath = (taskId: string) => EDIT_TASK_PATH.replace(":taskId", taskId);


export {LOGIN_PATH, TASKS_PATH, COMPLAINTS_PATH, HOME_PATH, TASK_PATH, EDIT_TASK_PATH, NEW_TASK_PATH, getTaskPath, getEditTaskPath};