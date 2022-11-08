import { useMutation, useQueryClient } from "react-query";
// import Category from "@repositories/category";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import axios from "axios";
import { getAuthCredentials } from "@utils/auth-utils";
import { toast } from "react-toastify";
import { ErrorResponse, } from "@ts-types/generated";
import { useTranslation } from "next-i18next";


export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();
  const { token } = getAuthCredentials();
  const { t } = useTranslation();
  return useMutation(
    (ids: string[]) =>
    // @ts-ignore
    axios.delete(`https://pandomart-bazaar.herokuapp.com/api/v1/categories`, {categoryIds: ids}, {
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
