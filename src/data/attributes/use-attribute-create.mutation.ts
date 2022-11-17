import { ShopInput } from "@ts-types/generated";
import { ROUTES } from "@utils/routes";
import Shop from "@repositories/shop";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export interface IAttributeCreateVariables {
  variables: {
    input: ShopInput;
  };
}

export const useCreateAttributeMutation = () => {
  const queryClient = useQueryClient();
  // @ts-ignore
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IAttributeCreateVariables) =>
    Shop.create(API_ENDPOINTS.SHOPS, input),
    {
      onSuccess: (data) => {
        console.log(data);
        // router.push(`/${router?.query?.shop}${ROUTES.ATTRIBUTES}`);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ATTRIBUTES);
      },
    }
  );
};
