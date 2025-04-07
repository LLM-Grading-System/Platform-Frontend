import { StudentSchema } from "../../types/api-students";
import { axiosInstance } from "./axios-config";

const STUDENTS = "/api/students";


const getAllStudents = async (): Promise<StudentSchema[]> => {
    const response = await axiosInstance.get<StudentSchema[]>(STUDENTS);
    return response.data;
};


export { getAllStudents };