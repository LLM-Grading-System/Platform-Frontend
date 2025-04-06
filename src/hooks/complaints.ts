import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifyError, showSuccess } from "../utils/notifications";
import { createComplaintAnswer, getAllComplaints } from "../services/api/complaints";
import { ComplaintAnswerRequest, ComplaintSchema } from "../types/api-complaints";

const useComplaints = () => {
    return useQuery({
        queryKey: ["complaints"],
        queryFn: () => getAllComplaints(),
        staleTime: 1000 * 60 * 5,
    });
};

const useCreateComplaintAnswer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: {complaintData: ComplaintAnswerRequest, complaintId: string}) => createComplaintAnswer(data.complaintId, data.complaintData),
        onError: notifyError,
        onSuccess: (data, variables) => {
            showSuccess(data.message);
            const {complaintData, complaintId} = variables;
            const complaints: Array<ComplaintSchema> = queryClient.getQueryData(["complaints"]) as Array<ComplaintSchema>;
            queryClient.setQueryData(["complaints"], complaints.map(comp => comp.complaintId === complaintId? ({...comp, teacherResponse: complaintData.teacherResponse}): comp));
        
        },
    });
};

export { 
    useComplaints, 
    useCreateComplaintAnswer,
};