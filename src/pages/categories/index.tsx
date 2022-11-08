import CategoryList from "@components/category/category-list";
import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
// import Search from "@components/common/search";
import LinkButton from "@components/ui/link-button";
import { useState } from "react";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { SortOrder } from "@ts-types/generated";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import TypeFilter from "@components/category/type-filter";
import { useCategoriesQuery, useNewCategoriesQuery } from "@data/category/use-categories.query";
import { adminOnly } from "@utils/auth-utils";

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  
  
  const {
    data: newData
  } = useNewCategoriesQuery();
  const {
    // data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    limit: 20,
    page,
    type,
    text: searchTerm,
    orderBy,
    sortedBy,
    parent: null,
  });

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  // function handleSearch({ searchText }: { searchText: string }) {
  //   setSearchTerm(searchText);
  //   setPage(1);
  // }
  function handlePagination(current: any) {
    setPage(current);
  }
  
  return (
    <>
      <Card className="flex flex-col mb-8">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-xl font-semibold text-heading">
              {t("form:input-label-categories")}
            </h1>
          </div>

          <div className="w-full xl:w-3/4 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center ms-auto">
            {/* <Search onSearch={handleSearch} /> */}
            <div className="w-full flex items-center rounded relative border border-border-base focus:border-accent">
            <input
              type="search"
              id="search"
              className="ps-10 pe-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0"
              placeholder={t("search")}
              aria-label="Search"
              autoComplete="off"
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

            <TypeFilter
              className="md:ms-6"
              onTypeFilter={({ slug }: { slug: string }) => {
                setType(slug);
                setPage(1);
              }}
            />
            {
              // @ts-ignore
              <LinkButton
                href={`${ROUTES.CATEGORIES}/create`}
                className="h-12 md:ms-6 w-full md:w-auto"
              >
                <span className="block md:hidden xl:block">
                  + {t("form:button-label-add-categories")}
                </span>
                <span className="hidden md:block xl:hidden">
                  + {t("form:button-label-add")}
                </span>
              </LinkButton>
            }
          </div>
        </div>
      </Card>
      <CategoryList
        categories={{data: newData?.categories}}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
        searchTerm={searchTerm}
      />
    </>
  );
}

Categories.authenticate = {
  permissions: adminOnly,
};
Categories.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common", "table"])),
  },
});
