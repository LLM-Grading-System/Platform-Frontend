import { notifications } from "@mantine/notifications"
import { ErrorResponse } from "../types/api-general";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { LOGIN_PATH } from "../app/paths";


const showSuccess = (message: string) => {
    notifications.show({
        color: "green",
        title: "Успешно!",
        message: message,
        autoClose: 4000,
    })
}

const showWarning = (message: string) => {
    notifications.show({
        color: "orange",
        title: "Предупреждение!",
        message: message,
        autoClose: 4000,
    })
}

const showError = (message: string) => {
    notifications.show({
        color: "red",
        title: "Ошибка!",
        message: message,
        autoClose: 4000,
    })
}


const notifyError = (error: AxiosError) => {
    const statusCode = error && error.response && error.response.status;
    if (statusCode === 401 || statusCode === 403){
        const navigate = useNavigate();
        navigate(LOGIN_PATH);
        return;
    }
    const data = error && error.response && error.response.data as ErrorResponse;
    showError(data? data.message: "Неизвестная ошибка")
}

export {notifyError, showWarning, showError, showSuccess}