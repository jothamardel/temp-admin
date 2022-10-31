import TrashIcon from "@components/icons/trash";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";
import cn from "classnames";
import Badge from "@components/ui/badge/badge";
import { useModalAction, useModalState } from "@components/ui/modal/modal.context";

type ConfirmationCardProps = {
  onCancel: () => void;
  onDelete: () => void;
  title?: string;
  icon?: any;
  description?: string;
  cancelBtnClassName?: string;
  deleteBtnClassName?: string;
  cancelBtnText?: string;
  deleteBtnText?: string;
  cancelBtnLoading?: boolean;
  deleteBtnLoading?: boolean;
  roles?: [];
};

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({
  onCancel,
  onDelete,
  icon,
  title = "button-delete",
  description = "delete-item-confirm",
  cancelBtnText = "button-cancel",
  deleteBtnText = "button-delete",
  cancelBtnClassName,
  deleteBtnClassName,
  cancelBtnLoading,
  deleteBtnLoading,
  roles = []
}) => {
  const { t } = useTranslation("common");
  const {data} = useModalState();
  const { updateUserData } = useModalAction();
  function checkIfRoleExist(name:string) {
    return data.roles.find((item: { name: string; }) => item.name.toLowerCase() === name.toLowerCase())
  }
  function updateUserRole(selectedRole: { name: string; _id: string;}) {
    const userData = {...data};
    const findRole = userData.roles.find((item: { name: string; _id: string}) => item._id === selectedRole._id);

    if (!findRole) {
      userData.roles.push(selectedRole);
    } else {
      const filterRoles = userData.roles.filter((item: { name: string; _id: string}) => item._id !== selectedRole._id);
      userData.roles = filterRoles;
    }
    // update the state here
    updateUserData(userData);
  }


  return (
    <div className="p-4 pb-6 bg-light m-auto max-w-sm w-full rounded-md md:rounded-xl sm:w-[24rem]">
      <div className="w-full h-full text-center">
        <div className="flex h-full flex-col justify-between">
          {icon ? (
            icon
          ) : (
            <TrashIcon className="mt-4 w-12 h-12 m-auto text-accent" />
          )}
          {/* <p className="text-heading text-xl font-bold mt-4">{t('Assign Or Revoke Roles')}</p> */}
          <p className="text-heading text-xl font-bold mt-4">{t(title)}</p>
          <p className="text-body-dark dark:text-muted leading-relaxed py-2 px-6">
            {/* {t("Are you sure you want to update user role(s)? Click to select user roles")} */}
            {t(description)}
          </p>
          <div className="flex flex-wrap">
              {
                roles?.map(({name, _id}: {name: string; _id: string;}) => (
                  <div className="mb-2" key={_id} onClick={() => {updateUserRole({ name, _id})}}>
                    <Badge 
                      textKey={name.toUpperCase().split('_').join(' ')}
                      color={checkIfRoleExist(name) ? "bg-green-500" : "bg-gray-500"}
                      className={"m-4 cursor-pointer rounded-sm"}
                    />
                  </div>
                ))
              }
            </div>
          <div className="flex items-center justify-between space-s-4 w-full mt-8">
            <div className="w-1/2">
              <Button
                onClick={onCancel}
                loading={cancelBtnLoading}
                disabled={cancelBtnLoading}
                variant="custom"
                className={cn(
                  "w-full py-2 px-4 bg-accent focus:outline-none hover:bg-accent-hover focus:bg-accent-hover text-light transition ease-in duration-200 text-center text-base font-semibold rounded shadow-md",
                  cancelBtnClassName
                )}
              >
                {t(cancelBtnText)}
              </Button>
            </div>

            

            <div className="w-1/2">
              <Button
                onClick={onDelete}
                loading={deleteBtnLoading}
                disabled={deleteBtnLoading}
                variant="custom"
                className={cn(
                  "w-full py-2 px-4 bg-red-600 focus:outline-none hover:bg-red-700 focus:bg-red-700 text-light transition ease-in duration-200 text-center text-base font-semibold rounded shadow-md",
                  deleteBtnClassName
                )}
              >
                {t(deleteBtnText)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationCard;
