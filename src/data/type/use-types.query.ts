import { QueryParamsType, TypesQueryOptionsType } from "@ts-types/custom.types";
// import { stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
// import Type from "@repositories/type";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { Type as TTYpe } from "@ts-types/generated";
import axios from "axios";

const fetchTypes = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    // text,
    // orderBy = "updated_at",
    // sortedBy = "DESC",
  } = params as TypesQueryOptionsType;
  // const searchString = stringifySearchQuery({
  //   name: text,
  // });
  // const url = `${API_ENDPOINTS.TYPES}?search=${searchString}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const { data: newData } = await axios.get(`https://pandomart-bazaar.herokuapp.com/api/v1/types`);
  // const { data } = await Type.all(url);

  return { types: newData?.data?.types as TTYpe[] };
};

type TypeResponse = {
  types: TTYpe[];
};

const useTypesQuery = (options: TypesQueryOptionsType = {}) => {
  return useQuery<TypeResponse, Error>(
    [API_ENDPOINTS.TYPES, options],
    fetchTypes,
    {
      keepPreviousData: true,
    }
  );
};

export { useTypesQuery, fetchTypes };
