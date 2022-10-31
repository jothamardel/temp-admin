// import { Form } from "@components/ui/form/form";
import Button from "@components/ui/button";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
// import Input from "@components/ui/input";
import { useTranslation } from "next-i18next";
import { useDeleteUser } from "@data/user/use-add-wallet-points.mutation";
import Link from "next/link";
import { ROUTES } from "@utils/routes";
// import * as Yup from "yup";

// type FormValues = {
//   points: number;
// };
// const addPointsValidationSchema = Yup.object().shape({
//   points: Yup.number()
//     .typeError("wallet points must be a number")
//     .positive("wallet points must be positive")
//     .required("You must need to set wallet points"),
// });

const UserWalletPointsAddView = () => {
  const { t } = useTranslation();
  
  const { data } = useModalState();
  const { mutate, isLoading: loading } = useDeleteUser();
  const { closeModal, updateUserData, closeOnlyModal } = useModalAction();

  // function onSubmit({ points }: FormValues) {
  //   addWalletPoints({
  //     variables: {
  //       input: {
  //         customer_id: customerId as string,
  //         points: points,
  //       },
  //     },
  //   });
  //   closeModal();
  // }

  console.log(data)

  return (
    <>
      <div className="bg-white shadow rounded p-4" style={{ width: '30rem'}}>
        <h1>User details</h1>
        <hr></hr>
        <div className="p-4">
          <div>
            <p>Full Name: {data?.fullname}</p>
          </div>
          <div>
            <p>Username: {data?.username}</p>
          </div>
          <div>
            <p>Email: {data?.email}</p>
          </div>
          <div>
            <p>Phone: {data?.phone}</p>
          </div>
          <div>
            <p>Is Active: {data?.is_active ? "True" : "False"}</p>
          </div>
          <div>
            <p>Is Suspended: {data?.isSuspended ? "True" : "False"}</p>
          </div>
          <div>
            <p>Is Deleted: {data?.isDeleted? "True" : "False"}</p>
          </div>
          <div>
            <p>Country: {data?.country}</p>
          </div>
          <div>
            <p>Nationality: {data?.nationality}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Button
              loading={loading}
              disabled={loading}
              className=""
              onClick={() => { mutate(data); closeModal();}}
            >
              {t(`Delete ${data?.fullname} account`)}
          </Button>
          <Link href={ROUTES.CREATEUSER}>
            <Button
                loading={loading}
                disabled={loading}
                className="ms-auto"
                onClick={() => { updateUserData(data); closeOnlyModal();}}
              >
                {t(`Edit`)}
            </Button>
          </Link>
        </div>

      </div>
    </>
  )
  // return (
  //   <Form<FormValues>
  //     onSubmit={onSubmit}
  //     validationSchema={addPointsValidationSchema}
  //   >
  //     {({ register, formState: { errors } }) => (
  //       <div className="p-5 bg-light flex flex-col m-auto max-w-sm w-full rounded sm:w-[24rem]">
  //         <Input
  //           label={t("form:input-label-add-wallet-points")}
  //           {...register("points")}
  //           // defaultValue="10"
  //           variant="outline"
  //           className="mb-4"
  //           error={t(errors.points?.message!)}
  //         />
  //         <Button
  //           type="submit"
  //           loading={loading}
  //           disabled={loading}
  //           className="ms-auto"
  //         >
  //           {t("form:button-label-submit")}
  //         </Button>
  //       </div>
  //     )}
  //   </Form>
  // );
};

export default UserWalletPointsAddView;
