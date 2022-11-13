import { QueryParamsType, ShopsQueryOptionsType } from "@ts-types/custom.types";
// @ts-ignore
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
// @ts-ignore
import Shop from "@repositories/shop";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ShopPaginator } from "@ts-types/generated";

const fetchShops = async ({
  queryKey,
}: QueryParamsType): Promise<{ shops: ShopPaginator }> => {
  const [_key, params] = queryKey;

  const {
    // page,
    // text,
    // limit = 15,
    // orderBy = "updated_at",
    // sortedBy = "DESC",
  } = params as ShopsQueryOptionsType;

  // const searchString = stringifySearchQuery({
  //   name: text,
  // });
  const url = `${API_ENDPOINTS.PSHOPS}`;
  const {
    data: { shops, ...rest },
  } = await Shop.all(url);
  // console.log(shops, {...rest})
  return {
    shops: {
      // @ts-ignore
      data: shops,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};

const useShopsQuery = (options: ShopsQueryOptionsType) => {
  return useQuery<{ shops: ShopPaginator }, Error>(
    [API_ENDPOINTS.PSHOPS, options],
    fetchShops,
    {
      keepPreviousData: true,
    }
  );
};

export { useShopsQuery, fetchShops };
