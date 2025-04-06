import { ComplaintAnswerRequest, ComplaintSchema } from "../../types/api-complaints";
import { SuccessResponse } from "../../types/api-general";
import { axiosInstance } from "./axios-config";

const COMPLAINTS = "/api/complaints";
const COMPLAINT_BY_ID = (complaintId: string) => `/api/complaints/${complaintId}`;
const COMPLAINT_ANSWER_BY_ID = (complaintId: string) => `${COMPLAINT_BY_ID(complaintId)}/answer`;



const getAllComplaints = async (): Promise<ComplaintSchema[]> => {
    const response = await axiosInstance.get<ComplaintSchema[]>(COMPLAINTS);
    return response.data;
};

const createComplaintAnswer = async (complaintId: string, comaplaintData: ComplaintAnswerRequest): Promise<SuccessResponse> => {
    const response = await axiosInstance.patch<SuccessResponse>(COMPLAINT_ANSWER_BY_ID(complaintId), comaplaintData);
    return response.data;
};


export { getAllComplaints, createComplaintAnswer };