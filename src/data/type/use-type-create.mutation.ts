import { CreateTypeInput, ErrorResponse } from "@ts-types/generated";
// import { ROUTES } from "@utils/routes";
// import Type from "@repositories/type";
// import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import axios from "axios";
import { getAuthCredentials } from "@utils/auth-utils";
import { toast } from "react-toastify";


export interface ITypeCreateVariables {
  variables: {
    input: CreateTypeInput;
  };
}

export const useCreateTypeMutation = () => {
  const queryClient = useQueryClient();
  // const router = useRouter();
  const { token } = getAuthCredentials();

  return useMutation(
    ({ variables: { input } }: ITypeCreateVariables) =>
      axios.post(`https://pandomart-bazaar.herokuapp.com/api/v1/types`, input, {
        headers: {
          Authorization: `${token}`,
        },
      }),
    {
      onSuccess: (data) => {
        console.log(data);
        // toast.success(data.message);
        // router.push(ROUTES.GROUPS);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.TYPES);
      },
      onError: (error: ErrorResponse) => {
        console.log(error.response.data);
        toast.error(error.response.data.message);
      }
    }
  );
};
