import Button from "@components/ui/button";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import { useForm } from "react-hook-form";
import Card from "@components/common/card";
import Description from "@components/ui/description";
import { useCreateUserMutation, useCreateNewUserMutation } from "@data/user/use-user-create.mutation";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerValidationSchema } from "./user-validation-schema";
import { useModalState } from "@components/ui/modal/modal.context";

type FormValues = {
  fullname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  country: string;
  role: string;
  profile_picture: string;
  bvn: string;
  nationality: string;
  occupation: string;
  description: string;
};


const CustomerCreateForm = () => {
  const { data } = useModalState();
  const { t } = useTranslation();
  const { mutate: registerUser, isLoading: loading } = useCreateUserMutation();
  const {mutate, isLoading} = useCreateNewUserMutation();
  const { data: stateData } = useModalState()
  
  const defaultValues = data ? {...data} : {
    email: "",
    password: "",
    fullname: "",
    username: "",
    country: "",
    role: "",
    profile_picture: "",
    bvn: "",
    nationality: "",
    occupation: "",
    description: ""
  };
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(customerValidationSchema),
  });

  async function onSubmit({ 
    fullname, 
    email, 
    password,
    username,
    country,
    role,
    profile_picture,
    bvn,
    nationality,
    occupation,
    description
  }: FormValues) {
    if(!data) {
      mutate(
        {
          variables: {
            fullname,
            email,
            password,
            username,
            country,
            role,
            profile_picture,
            bvn,
            nationality,
            occupation,
            description
          },
        },
        {
          onError: (error: any) => {
            Object.keys(error?.response?.data).forEach((field: any) => {
              setError(field, {
                type: "manual",
                message: error?.response?.data[field][0],
              });
            });
          },
        }
      );
      return;
    }
    

    registerUser(
      {
        variables: {
          _id: data?._id,
          fullname,
          email,
          password,
          username,
          country,
          role,
          profile_picture,
          bvn,
          nationality,
          occupation,
          description
        },
      },
      {
        onError: (error: any) => {
          Object.keys(error?.response?.data).forEach((field: any) => {
            setError(field, {
              type: "manual",
              message: error?.response?.data[field][0],
            });
          });
        },
      }
    );
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t("form:form-title-information")}
          details={t("form:customer-form-info-help-text")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t("form:input-label-name")}
            {...register("fullname")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.fullname?.message!)}
          />
          <Input
            label={t("form:input-label-email")}
            {...register("email")}
            type="email"
            variant="outline"
            className="mb-4"
            error={t(errors.email?.message!)}
          />
          <Input
            label={t("Username")}
            {...register("username")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.username?.message!)}
          />
          <Input
            label={t("form:input-label-country")}
            {...register("country")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.country?.message!)}
          />
          <Input
            label={t("Phone")}
            {...register("phone")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.phone?.message!)}
          />
          <Input
            label={t("Profile picture")}
            {...register("profile_picture")}
            type="file"
            variant="outline"
            className="mb-4"
            error={t(errors.profile_picture?.message!)}
          />
          <Input
            label={t("BVN")}
            {...register("bvn")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.bvn?.message!)}
          />
          <Input
            label={t("Nationality")}
            {...register("nationality")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.nationality?.message!)}
          />
          <Input
            label={t("Occupation")}
            {...register("occupation")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.occupation?.message!)}
          />
          <Input
            label={t("Description")}
            {...register("description")}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.description?.message!)}
          />
          <PasswordInput
            label={t("form:input-label-password")}
            {...register("password")}
            error={t(errors.password?.message!)}
            variant="outline"
            className="mb-4"
          />
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button loading={loading || isLoading} disabled={loading || isLoading}>
          {data ? t("Update") : t("form:button-label-create-customer")}
        </Button>
      </div>
    </form>
  );
};

export default CustomerCreateForm;
