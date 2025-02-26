import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getCurrentUser, login } from "../services/api/auth";
import { LoginRequest, TokenResponse } from "../types/api-auth";
import TokenService from "../services/localStorage/auth-token";
import { notifyError } from "../utils/notifications";


const useCurrentUser = () => {
  return useQuery(
        {
            queryKey: ["me"],
            queryFn: () => getCurrentUser(),
            staleTime: 1000 * 60 * 10,
        }
    )
};

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
      {
          mutationKey: ["login"],
          mutationFn: (data: LoginRequest) => login(data),
          onError: notifyError,
          onSuccess: (data: TokenResponse) => {
              TokenService.setNewToken(data.token);
              queryClient.invalidateQueries({ queryKey: ["me"] });
              navigate(`/`);
          },
      }
  )
};


export { useCurrentUser, useLogin };