import { ErrorResponse, UpdateCategory } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
// import Category from "@repositories/category";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useTranslation } from "next-i18next";
import axios from "axios";
import { getAuthCredentials } from "@utils/auth-utils";

export interface ICategoryUpdateVariables {
  variables: {
    id: string;
    input: UpdateCategory;
  };
}

export const useUpdateCategoryMutation = () => { 
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { token } = getAuthCredentials();
  return useMutation(
    ({ variables: { id, input } }: ICategoryUpdateVariables) =>
    axios.put(`https://pandomart-bazaar.herokuapp.com/api/v1/categories/${id}`, input, {
      headers: {
        Authorization: `${token}`,
      },
    }),
    {
      onSuccess: (data) => {
        console.log(data)
        toast.success(t("common:successfully-updated"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.CATEGORIES);
      },
      onError: (error: ErrorResponse) => {
        toast.error(error.response.data.message)
      }
    }
  );
};
