import { RegisterInput, ErrorResponse } from "@ts-types/generated";
import { ROUTES } from "@utils/routes";
// import User from "@repositories/user";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import axios from "axios";
import { getAuthCredentials } from "@utils/auth-utils";
import { toast } from "react-toastify";

export interface IRegisterVariables {
  variables: RegisterInput;
}

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { token } = getAuthCredentials();

  return useMutation(
    ({ variables }: IRegisterVariables) =>
      axios.put(`https://pandomart-bazaar.herokuapp.com/api/v1/user/profile/update`, {...variables}, {
        headers: {
          Authorization: `${token}`,
        },
      }),
    {
      onSuccess: (data) => {
        toast.success(data.data.message)
        router.push(ROUTES.USERS);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.USERS);
      },
      onError: (error: ErrorResponse) => {
        console.log(error.response);
        toast.error(error.response.data.message);
      }
    }
  );
};

export const useCreateNewUserMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { token } = getAuthCredentials();

  return useMutation(
    ({ variables }: IRegisterVariables) =>
      axios.post(`https://pandomart-bazaar.herokuapp.com/api/v1/user/create`, {...variables}, {
        headers: {
          Authorization: `${token}`,
        },
      }),
    {
      onSuccess: (data) => {
        toast.success(data.data.message)
        router.push(ROUTES.USERS);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.USERS);
      },
      onError: (error: ErrorResponse) => {
        console.log(error.response);
        toast.error(error.response.data.message);
      }
    }
  );
};
