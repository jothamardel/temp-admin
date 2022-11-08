import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
// import Search from "@components/common/search";
import CustomerList from "@components/user/user-list";
import LinkButton from "@components/ui/link-button";
import { useState } from "react";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useUsersQuery } from "@data/user/use-users.query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { SortOrder } from "@ts-types/generated";
import { adminOnly } from "@utils/auth-utils";
import { useModalAction } from "@components/ui/modal/modal.context";

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const { closeModal } = useModalAction();

  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const {
    data,
    isLoading: loading,
    error,
  } = useUsersQuery({
    limit: 20,
    page,
    text: searchTerm,
    orderBy,
    sortedBy,
  }); 

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  // @ts-ignore
  function handleSearch({ searchText }: { searchText: string }) {
    // console.log("Search text: ", searchText);
    setSearchTerm(searchText);
    setPage(1);
  }
  function handlePagination(current: any) {
    setPage(current);
  }

  return (
    <>
      <Card className="flex flex-col md:flex-row items-center mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t("form:input-label-customers")}
          </h1>
        </div>
        

        <div className="w-full md:w-3/4 flex items-center ms-auto">
         
          {/* <Search 
            onSearch={handleSearch} 
          /> */}
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
          <LinkButton
            href={`${ROUTES.USERS}/create`}
            className="h-12 ms-4 md:ms-6"
          >
            <span onClick={closeModal}>+ {t("form:button-label-add-customer")}</span>
          </LinkButton>
        </div>
      </Card>

      {loading ? null : (
        <CustomerList
          customers={data?.users}
          searchTerm={searchTerm}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
        />
      )}
    </>
  );
}

Customers.authenticate = {
  permissions: adminOnly,
};
Customers.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
