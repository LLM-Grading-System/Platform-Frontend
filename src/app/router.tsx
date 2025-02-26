import { BrowserRouter, Routes, Route } from "react-router";
import BaseLayout from "../layouts/base-layout";
import Page404 from "../pages/404";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import { EDIT_TASK_PATH, LOGIN_PATH, NEW_TASK_PATH, TASK_PATH, TASKS_PATH } from "./paths";
import CatalogPage from "../pages/catalog";
import TaskInfoPage from "../pages/task-info";
import TaskCreatePage from "../pages/task-create";
import TaskEditPage from "../pages/task-edit";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<BaseLayout />}>
                    <Route index element={<HomePage />} /> 
                    <Route path={TASKS_PATH} element={<CatalogPage />} />
                    <Route path={TASK_PATH} element={<TaskInfoPage />} />
                    <Route path={EDIT_TASK_PATH} element={<TaskEditPage />} />
                    <Route path={NEW_TASK_PATH} element={<TaskCreatePage/>} />
                    <Route path="*" element={<Page404/>}/>
                </Route>
                <Route path={LOGIN_PATH} element={<LoginPage />} />
            </Routes>
      </BrowserRouter>
    )
}
export default AppRouter;