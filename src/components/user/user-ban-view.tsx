import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useBlockUserMutation } from "@data/user/use-user-block.mutation";
// import { useUnblockUserMutation } from "@data/user/use-user-unblock.mutation";

const CustomerBanView = () => {
  const { mutate: blockUser, isLoading: loading } = useBlockUserMutation();
  // const { mutate: unblockUser, isLoading: activeLoading } =
  //   useUnblockUserMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();

  async function handleDelete() {
    blockUser(data)
    // if (data?.type === "ban") {
    //   blockUser(data?.id);
    // } else {
    //   unblockUser(data?.id);
    // }
    closeModal();
  }
  console.log(data);
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText={!data?.isSuspended ? "Suspend" : "Unsuspend"}
      title={!data?.isSuspended ? "Suspend User" : "Unsuspend User"}
      description="Are you sure you want to suspend this user?"
      deleteBtnLoading={loading}
    />
  );
};

export default CustomerBanView;
