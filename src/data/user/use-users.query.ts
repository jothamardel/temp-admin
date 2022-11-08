import { QueryParamsType, QueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData } from "@utils/data-mappers";
import { useQuery } from "react-query";
// import User from "@repositories/user";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import usersData from "../../../db/user.json";
import axios from "axios";
import { getAuthCredentials } from "@utils/auth-utils";

// @ts-ignore
const fetchUsers = async ({ queryKey }: QueryParamsType) => {
  // const [_key, params] = queryKey;
  // const {
  //   page,
  //   text,
  //   limit = 15,
  //   orderBy = "updated_at",
  //   sortedBy = "DESC",
  // } = params as QueryOptionsType;
  // const url = `${API_ENDPOINTS.USERS}?search=${text}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}&with=wallet`;
  // const {
  //   data: { data, ...rest },
  // } = await User.all(url);

  const { token } = getAuthCredentials();
  const {
    data: { data, ...rest },
  } = await axios.get('https://pandomart-bazaar.herokuapp.com/api/v1/user/list', {
    headers: {
      Authorization: `${token}`,
    },
  })

  // console.log(data)
  
  return { users: { data: usersData, newData: data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useUsersQuery = (options: QueryOptionsType) => {
  return useQuery<any, Error>([API_ENDPOINTS.USERS, options], fetchUsers, {
    keepPreviousData: true,
  });
};

export { useUsersQuery, fetchUsers };
