import User from "@repositories/user";
import { useMutation, useQueryClient } from "react-query";
import {ErrorResponse } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
import { getAuthCredentials } from "@utils/auth-utils";
import axios from "axios";


export interface IAddWalletPointsVariables {
  variables: {
    input: { customer_id: string; points: number };
  };
}

export const useAddWalletPointsMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { input } }: IAddWalletPointsVariables) =>
      User.addWalletPoints(API_ENDPOINTS.ADD_WALLET_POINTS, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.USERS);
      },
    }
  );
};

export const useDeleteUser = () => {
  const { t } = useTranslation();
  const { token } = getAuthCredentials();

  const { mutate, isLoading} =  useMutation(
    (userDetails: { _id: string; }) =>
      axios.delete(`https://pandomart-bazaar.herokuapp.com/api/v1/user/${userDetails._id}`,  {
        headers: {
          Authorization: `${token}`,
        },
      }),
    {
      onSuccess: (data) => {
        toast.success(t(data.data.message));
      },
      onError: (error: ErrorResponse) => {
        // console.log(error.response.data.message);
        toast.error(error.response.data.message)
      }
    }
  );
  return { mutate, isLoading,  };
};
