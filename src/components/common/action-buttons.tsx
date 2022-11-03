import { BanUser } from "@components/icons/ban-user";
import EditIcon from "@components/icons/edit";
import Trash from "@components/icons/trash";
import { Eye } from "@components/icons/eye-icon";
// import { WalletPointsIcon } from "@components/icons/wallet-point";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";
import { CheckMarkCircle } from "@components/icons/checkmark-circle";
import { useModalAction } from "@components/ui/modal/modal.context";
import { CloseFillIcon } from "@components/icons/close-fill";
import { AdminIcon } from "@components/icons/admin-icon";

type Props = { 
  id: string;
  deleteModalView?: string | any;
  editUrl?: string;
  detailsUrl?: string;
  isUserActive?: boolean;
  userStatus?: boolean;
  users?: [];
  categoriesList?:{};
  isShopActive?: boolean;
  approveButton?: boolean;
  showAddWalletPoints?: boolean;
  changeRefundStatus?: boolean;
  showMakeAdminButton?: boolean;
  selected_cats?: string[];
};

const ActionButtons = ({
  id,
  deleteModalView,
  editUrl,
  detailsUrl,
  // userStatus = false,
  // isUserActive = false,
  isShopActive,
  approveButton = false,
  showAddWalletPoints = false,
  changeRefundStatus = false,
  showMakeAdminButton = false,
  users = [],
  categoriesList = {},
  selected_cats = [],
}: Props) => {
  const { t } = useTranslation();
  const { openModal, updateUserData } = useModalAction();
  const user = users.find((item: {id: string;}) => item.id === id);
  
  function userDetails(userId: string): null | { isSuspended: boolean; } {
    const user = users.find((item: {id: string;}) => item.id === userId);

    if(!user) return null;
    return user;
  }
  function handleDelete() {
    openModal(deleteModalView, selected_cats);
  }
  function handleUserStatus() {
    openModal("BAN_CUSTOMER", user);
  }
  function handleAddWalletPoints() {
    openModal("ADD_WALLET_POINTS", user);
  }
  function handleMakeAdmin() {
    // const user = users.find((item: {id: string;}) => item.id === id);
    openModal("MAKE_ADMIN", user);
  }
  function handleUpdateRefundStatus() {
    openModal("UPDATE_REFUND", id);
  }
  function handleShopStatus(status: boolean) {
    if (status === true) {
      openModal("SHOP_APPROVE_VIEW", id);
    } else {
      openModal("SHOP_DISAPPROVE_VIEW", id);
    }
  }

  function handleCategoryUpdate() {
    updateUserData(categoriesList);
  }
  return (
    <div className="space-s-5 inline-flex items-center w-auto">
      {showMakeAdminButton && (
        <button
          onClick={handleMakeAdmin}
          className="text-accent transition duration-200 hover:text-accent-hover focus:outline-none"
          title={t("common:text-make-admin")}
        >
          <AdminIcon width={18} />
        </button>
      )}

      {showAddWalletPoints && (
        <button
          onClick={handleAddWalletPoints}
          className="text-accent transition duration-200 hover:text-accent-hover focus:outline-none"
          title={t("View profile")}
        >
          <Eye width={22} />
        </button>
      )}

      {changeRefundStatus && (
        <button
          onClick={handleUpdateRefundStatus}
          className="text-accent transition duration-200 hover:text-accent-hover focus:outline-none"
          title={t("common:text-change-refund-status")}
        >
          <CheckMarkCircle width={20} />
        </button>
      )}
      {deleteModalView && (
        <button
          onClick={handleDelete}
          className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
          title={t("common:text-delete")}
        >
          <Trash width={16} />
        </button>
      )}
      {approveButton &&
        (!isShopActive ? (
          <button
            onClick={() => handleShopStatus(true)}
            className="text-accent transition duration-200 hover:text-accent-hover focus:outline-none"
            title={t("common:text-approve-shop")}
          >
            <CheckMarkCircle width={20} />
          </button>
        ) : (
          <button
            onClick={() => handleShopStatus(false)}
            className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
            title={t("common:text-disapprove-shop")}
          >
            <CloseFillIcon width={20} />
          </button>
        ))}

      {userDetails(id) && (
        <>
          {!userDetails(id)?.isSuspended ? (
            <button
              onClick={() => handleUserStatus()}
              className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
              title={t("common:text-ban-user")}
            >
              <BanUser width={20} />
            </button>
          ) : (
            <button
              onClick={() => handleUserStatus()}
              className="text-accent transition duration-200 hover:text-accent focus:outline-none"
              title={t("common:text-activate-user")}
            >
              <CheckMarkCircle width={20} />
            </button>
          )}
        </>
      )}

      {editUrl && (
        <Link
          href={editUrl}
          className="text-base transition duration-200 hover:text-heading"
          title={t("common:text-edit")}
        >
          <EditIcon width={16} onClick={handleCategoryUpdate}/>
        </Link>
      )}
      {detailsUrl && (
        <Link
          href={detailsUrl}
          className="ml-2 text-base transition duration-200 hover:text-heading"
          title={t("common:text-view")}
        >
          <Eye width={24} />
        </Link>
      )}
    </div>
  );
};

export default ActionButtons;
