import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useMeQuery } from "@data/user/use-me.query";
import ShopCard from "@components/shop/shop-card";
import NoShopSvg from "../../../../public/no-shop.svg";
import ShopLayout from "@components/layouts/shop";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import LinkButton from "@components/ui/link-button";

export default function OwnerDashboard() {
  const { t } = useTranslation();
  const { data, isLoading: loading, error } = useMeQuery();
  const {
    query: { shop },
  } = useRouter();

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;
  console.log(shop)
  return (
    <>
      <div className="flex justify-between items-center border-b border-dashed border-border-base mb-5 sm:mb-8 pb-8">
        <h1 className="text-lg font-semibold text-heading">
          {t("common:sidebar-nav-item-my-shops")}
        </h1>
        {
            // @ts-ignore
            <LinkButton
              href={`/${shop}/all/create`}
              className="h-12 mt-5 md:mt-0 md:ms-auto w-full md:w-auto"
            >
              <span>
                + {t("form:button-label-add")} {t("common:shop")}
              </span>
            </LinkButton>
          }
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-5 gap-5">
        {data?.shops?.map((myShop: any, idx: number) => (
          <ShopCard shop={myShop} key={idx} />
        ))}
      </div>

      {!data?.managed_shop && !data?.shops?.length ? (
        <div className="w-full flex flex-col items-center p-10">
          <div className="w-[300px] sm:w-[490px] h-[180px] sm:h-[370px] relative">
            <Image
              alt={t("common:text-image")}
              src={NoShopSvg}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <span className="text-lg font-semibold text-center text-body-dark mt-6 sm:mt-10">
            {t("common:text-no-shop")}
          </span>
        </div>
      ) : null}
      {!!data?.managed_shop ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-5">
          <ShopCard shop={data?.managed_shop} />
        </div>
      ) : null}
    </>
  );
}

OwnerDashboard.Layout = ShopLayout;


export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
