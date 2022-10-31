import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useMakeOrRevokeAdminMutation, useUserRoles } from "@data/user/use-make-revoke-admin-mutation";
import { useEffect } from "react";


const CustomerBanView = () => {

  const { mutate: makeOrRevokeAdmin, isLoading: loading } =
    useMakeOrRevokeAdminMutation();
    const { mutate, roles } = useUserRoles();
  const { data } = useModalState();

  const { closeModal } = useModalAction();
  async function handleMakeAdmin() {
    makeOrRevokeAdmin(data);
    closeModal();
  }

  useEffect(() => {
    mutate();
  }, [])


  return (
    <ConfirmationCard 
      onCancel={closeModal}
      onDelete={handleMakeAdmin}
      deleteBtnText="text-yes"
      title="Assign Or Revoke Roles"
      description="Are you sure you want to update user role(s)? Click to select user roles"
      deleteBtnLoading={loading}
      roles={roles}
    />
  );
};

export default CustomerBanView;
