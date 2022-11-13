// @ts-ignore
import { LoginInput, Response, ErrorResponse } from "@ts-types/generated";
import { useMutation } from "react-query";
import User from "@repositories/user";
// import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useState } from "react";
import { allowedRoles, hasAccess, setAuthCredentials } from "@utils/auth-utils";
// import { useRouter } from "next/router";
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

  const userRoles = data?.user?.roles.map((item: roles) => item.name);
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
        // console.log(data.data)
        // @ts-ignore
        const dataJson =  {
          user: {
              "device_token": [],
              "roles": [
                  {
                      "_id": "625c7ba9c4c1b16967dd8307",
                      "name": "customer"
                  },
                  {
                      "_id": "625c7ba9c4c1b16967dd8309",
                      "name": "vendor"
                  }
              ],
              "is_active": true,
              "isSuspended": false,
              "isDeleted": false,
              "phone": "",
              "description": "",
              "nationality": "",
              "occupation": "",
              "profile_picture": "",
              "shops": [
                  "62e669b5efb17b00168df8fe",
                  "62e66a8fefb17b00168df915",
                  "62e72ad7c19e3b00161e2ee3"
              ],
              "address": [],
              "_id": "62d10e3d94ac850016079410",
              "fullname": "Mbiplang Ardel",
              "username": "bee",
              "email": "ardelmbiplang@gmail.com",
              "country": "chocolate",
              "activation_code": null,
              "activation_expires_in": null,
              "createdAt": "2022-07-15T06:50:37.592Z",
              "updatedAt": "2022-08-01T01:22:31.828Z",
              "notification_counter": 6,
              "id": "62d10e3d94ac850016079410"
          },
          token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDEwZTNkOTRhYzg1MDAxNjA3OTQxMCIsImVtYWlsIjoiYXJkZWxtYmlwbGFuZ0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImJlZSIsImlhdCI6MTY2ODMzNTU5MiwiZXhwIjoxNjcwOTI3NTkyfQ.g6q9cKWdpX8ejLTXwbLNElN22RnAdrtwTyE-zKkhE00",
          "expires_in": 2592000
      }
        

        data.data.user.roles = dataJson.user.roles;
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
