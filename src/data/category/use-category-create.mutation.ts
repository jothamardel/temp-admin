import { CreateCategory } from "@ts-types/generated";
import { ROUTES } from "@utils/routes";
import Category from "@repositories/category";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import axios from "axios";
import { getAuthCredentials } from "@utils/auth-utils";


export interface ICategoryCreateVariables {
  variables: { input: CreateCategory };
}

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { token } = getAuthCredentials();

  return useMutation(
    ({ variables: { input } }: ICategoryCreateVariables) =>
      axios.post(`https://pandomart-bazaar.herokuapp.com/api/v1/categories`, input, {
        headers: {
          Authorization: `${token}`,
        },
      }),
    {
      onSuccess: () => {
        router.push(ROUTES.CATEGORIES);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.CATEGORIES);
      },
    }
  );
};
