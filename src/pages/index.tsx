import dynamic from "next/dynamic";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  allowedRoles,
  getAuthCredentials,
  hasAccess,
  isAuthenticated,
} from "@utils/auth-utils";
// @ts-ignore
import { SUPER_ADMIN, ADMIN } from "@utils/constants";
import { ROUTES } from "@utils/routes";
import AppLayout from "@components/layouts/app";
const AdminDashboard = dynamic(() => import("@components/dashboard/admin"));
const OwnerDashboard = dynamic(() => import("@components/dashboard/owner"));

export default function Dashboard({
  userPermissions,
}: {
  userPermissions: string[];
}) {
  console.log("Browser permissions: ", userPermissions);
  if (userPermissions?.includes(ADMIN)) {
    // @ts-ignore
    return <AdminDashboard />;
  }
  // @ts-ignore
  return <OwnerDashboard />;
}

Dashboard.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;
  const { token, permissions } = getAuthCredentials(ctx);
  console.log("Permissions: ", permissions)
  if (
    !isAuthenticated({ token, permissions }) ||
    !hasAccess(allowedRoles, permissions)
  ) {
    return {
      redirect: {
        destination: ROUTES.LOGIN,
        permanent: false,
      },
    };
  }
  if (locale) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          "common",
          "table",
          "widgets",
        ])),
        userPermissions: permissions,
      },
    };
  }
  return {
    props: {
      userPermissions: permissions,
    },
  };
};
