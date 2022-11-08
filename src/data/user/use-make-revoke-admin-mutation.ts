import { MakeAdminInput, ErrorResponse } from "@ts-types/generated";
// import User from "@repositories/user";
// @ts-ignore
import { useMutation, useQueryClient } from "react-query";
// import { API_ENDPOINTS } from "@utils/api/endpoints";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
import axios from "axios";
import { useState } from "react";
import { getAuthCredentials } from "@utils/auth-utils";

export interface IMakeAdminVariables {
  input: MakeAdminInput;
}

export const useMakeOrRevokeAdminMutation = () => {
  // const queryClient = useQueryClient(); 
  const { t } = useTranslation();
  const { token } = getAuthCredentials();

  const { mutate, isLoading} =  useMutation(
    (userDetails: { _id: string; }) =>
      axios.put(`https://pandomart-bazaar.herokuapp.com/api/v1/user/profile/update/${userDetails._id}`, userDetails, {
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
        console.log(error.response.data);
        toast.error(error.response.data.message[0])
      }
    }
  );
  return { mutate, isLoading,  };
};

export const useUserRoles = () => {
  // const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [roles, setRoles] = useState<[]>([]);
  const { token } = getAuthCredentials();

  const { mutate, isLoading} =  useMutation(
    () =>
      axios.get("https://pandomart-bazaar.herokuapp.com/api/v1/role/list", {
        headers: {
          Authorization: `${token}`,
        },
      }),
    {
      onSuccess: (data) => {
        setRoles(data.data.data)
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
  return { mutate, isLoading, roles };
};
