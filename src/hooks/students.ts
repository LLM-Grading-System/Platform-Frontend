import { useQuery } from "@tanstack/react-query";
import { getAllStudents } from "../services/api/students";

const useStudents = () => {
    return useQuery({
        queryKey: ["students"],
        queryFn: () => getAllStudents(),
        staleTime: 1000 * 60 * 5,
    });
};

export { 
    useStudents, 
};