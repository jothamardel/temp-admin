import {
  QueryParamsType,
  CategoriesQueryOptionsType,
} from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Category from "@repositories/category";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { CategoryPaginator } from "@ts-types/generated";
import axios from "axios";
import { getAuthCredentials } from "@utils/auth-utils";


const fetchCategories = async ({
  queryKey,
}: QueryParamsType): Promise<{ categories: CategoryPaginator }> => {
  const [_key, params] = queryKey;

  const {
    page,
    text,
    type,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
    parent,
  } = params as CategoriesQueryOptionsType;

  const searchString = stringifySearchQuery({
    name: text,
    type,
  });
  // @ts-ignore
  const queryParams = new URLSearchParams({
    searchJoin: "and",
    orderBy,
    sortedBy,
    ...(typeof parent === undefined ? {} : { parent }),
    limit: limit.toString(),
    ...(page && { page: page.toString() }),
    ...(Boolean(searchString) && { search: searchString }),
  });
  const url = `${API_ENDPOINTS.CATEGORIES}?${queryParams.toString()}`;
  const {
    data: { data, ...rest },
  } = await Category.all(url);
  return {
    categories: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};


const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<{ categories: CategoryPaginator }, Error>(
    [API_ENDPOINTS.CATEGORIES, options],
    fetchCategories,
    {
      keepPreviousData: true,
    }
  );
};


const fetchNewCategories = async () => {

  const { token } = getAuthCredentials();
  
  const {
    data: { data },
  } = await axios.get(`https://pandomart-bazaar.herokuapp.com/api/v1/categories`);
  return data
};


const useNewCategoriesQuery = () => {

  return useQuery(
    [],
    fetchNewCategories,
    {
      keepPreviousData: true,
    }
  );
};

export { useCategoriesQuery, fetchCategories, useNewCategoriesQuery, fetchNewCategories };
