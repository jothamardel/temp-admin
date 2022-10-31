import { LoginInput, Response, ErrorResponse } from "@ts-types/generated";
import { useMutation } from "react-query";
import User from "@repositories/user";
// import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useState } from "react";
import { allowedRoles, hasAccess, setAuthCredentials } from "@utils/auth-utils";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";

export interface ILoginVariables {
  variables: LoginInput;
}

interface ILoginUser {
  user: {
    roles: []
  },
  token: string;
}

interface roles {
  name: string;
  id: string;
}


function loginUser(data:  ILoginUser, __route: any ) {

  const userRoles = data.user.roles.map((item: roles) => item.name);
  if(hasAccess(allowedRoles, userRoles)){
    setAuthCredentials(data.token, userRoles, data);
    __route.push(ROUTES.DASHBOARD);
  }

}

export const useLoginMutation = (url: string, route: any) => {
  let [serverError, setServerError] = useState<string | null>(null);
  const [tokenInput, setShowTokenInput] = useState<boolean>(false);
  const {mutate, isLoading} =  useMutation(({ variables }: ILoginVariables) =>
    User.login(url, variables),
    {
      onSuccess: ({ data }) => {
        if (url) {
          setShowTokenInput(true);
          return;
        }
        loginUser(data.data, route);
      },
      onError: (error: ErrorResponse) => {
        console.log(error.response.data);
        setServerError(error.response.data.message);
      }
    }
  );

  return { 
    mutate, 
    isLoading, 
    serverError, 
    setServerError, 
    tokenInput, 
    setShowTokenInput 
  };
};


export const useTokenMutation = (route: any) => {
  let [serverError, setServerError] = useState<string | null>(null);
  const {mutate, isLoading, isError} =  useMutation((token: string) =>
    User.loginAdmin(token),
    {
      onSuccess: ({ data }) => {
        loginUser(data.data, route);
      },
      onError: (error: ErrorResponse) => {
        console.log(error.response.data);
        setServerError(error.response.data.message);
      }
    }
  );

  return { 
    mutate, 
    isLoading, 
    isError,
    serverError, 
    setServerError,
  };
};
