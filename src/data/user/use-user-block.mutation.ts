// @ts-ignore
import { useMutation, useQueryClient } from "react-query";
import {ErrorResponse } from "@ts-types/generated";
// import User from "@repositories/user";
// import { API_ENDPOINTS } from "@utils/api/endpoints";
import axios from "axios";
// import { useState } from "react";
import { getAuthCredentials } from "@utils/auth-utils";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";

export const useBlockUserMutation = () => {
  // const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { token } = getAuthCredentials();
  

  const { mutate, isLoading} =  useMutation(
    (userDetails: { _id: string; }) =>
      axios.put(`https://pandomart-bazaar.herokuapp.com/api/v1/user/${userDetails._id}/suspend`, {}, {
        headers: {
          Authorization: `${token}`,
        },
      }),
    {
      onSuccess: (data) => {
        toast.success(t(data.data.message));
      },
      // Always refetch after error or success:
      onSettled: () => {
        // queryClient.invalidateQueries(API_ENDPOINTS.USERS);
      },
      onError: (error: ErrorResponse) => {
        // console.log(error.response.data.message);
        toast.error(error.response.data.message)
      }
    }
  );
  return { mutate, isLoading,  };
};
