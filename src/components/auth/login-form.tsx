import Alert from "@components/ui/alert";
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation, useTokenMutation } from "@data/user/use-login.mutation";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
// import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import * as yup from "yup";
import Link from "@components/ui/link";
// import { allowedRoles, hasAccess, setAuthCredentials } from "@utils/auth-utils";
import { API_ENDPOINTS } from "@utils/api/endpoints";

type FormValues = {
  id: string;
  password: string;
};
type TokenValues = {
  token: string;
}
const tokenSchema = yup.object().shape({
  token: yup.string().required()
})
const loginFormSchema = yup.object().shape({
  id: yup
    .string()
    .email("form:error-email-format")
    .required("form:error-email-required"),
  password: yup.string().required("form:error-password-required"),
});
const defaultValues = {
  id: "",
  password: "",
};
// const defaultTokenValue = {
//   token: ""
// };

const LoginForm = () => {
  const [url, setUrl] = useState("")
  const router = useRouter();
  const { 
    mutate: login, 
    isLoading: loading, 
    serverError, 
    setServerError,
    tokenInput, 
    setShowTokenInput 
  } = useLoginMutation(url, router);
  const [errorMsg, setErrorMsg] = useState("");
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });
  

  function onSubmit({ id, password }: FormValues) {
    login(
      {
        variables: {
          id,
          password,
        },
      },
      
      // {
      //   onSuccess: ({ data }) => {
      //     if (data?.token) {
      //       if (hasAccess(allowedRoles, data?.permissions)) {
      //         setAuthCredentials(data?.token, data?.permissions);
      //         router.push(ROUTES.DASHBOARD);
      //         return;
      //       }
      //       setErrorMsg("form:error-enough-permission");
      //     } else {
      //       setErrorMsg("form:error-credential-wrong");
      //     }
      //   },
      //   onError: () => {},
      // }
    );
  }


  return (
    <>
      {
        !tokenInput &&
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {serverError && (
              <Alert
                message={t(serverError)}
                variant="error"
                closeable={true}
                className="my-5"
                onClose={() => setServerError(null)}
              />
            )
          }
          <Input
            label={t("form:input-label-email")}
            {...register("id")}
            type="email"
            variant="outline"
            className="mb-4"
            error={t(errors?.id?.message!)}
          />
          <PasswordInput
            label={t("form:input-label-password")}
            forgotPassHelpText={t("form:input-forgot-password-label")}
            {...register("password")}
            error={t(errors?.password?.message!)}
            variant="outline"
            className="mb-4"
            forgotPageLink="/forgot-password"
          />
          <div className="flex items-center pb-2">
            <input
              id="isAdmin"
              name="isAdmin"
              type="checkbox"
              className="mt-0 pt-0 mr-2"
              onChange={e => {
                if(e.target.checked) {
                  setUrl(API_ENDPOINTS.SUPERADMIN);
                  return ;
                }
                setUrl("");
              }}
            />
            <label
              htmlFor="isAdmin"
              className="block text-body-dark font-semibold text-sm leading-none"
            >
              super admin
            </label>
          </div>
          <Button className="w-full" loading={loading} disabled={loading}>
            {t("form:button-label-login")}
          </Button>

          <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
            <hr className="w-full" />
            <span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">
              {t("common:text-or")}
            </span>
          </div>

          <div className="text-sm sm:text-base text-body text-center">
            {t("form:text-no-account")}{" "}
            {
              // @ts-ignore
              <Link
                href="/register"
                className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-700 hover:no-underline focus:no-underline"
              >
                {t("form:link-register-shop-owner")}
              </Link>
            }
          </div>

          {errorMsg ? (
            <Alert
              message={t(errorMsg)}
              variant="error"
              closeable={true}
              className="mt-5"
              onClose={() => setErrorMsg("")}
            />
          ) : null}
        </form>
      }
      {
        tokenInput && 
        <LoginAdmin 
          setShowTokenInput={(value) => { setShowTokenInput(value); setUrl("");}}
        /> 
      }
    </>
  );
};

interface AdminTokenProps {
  setShowTokenInput: (value: boolean) => void
}

const LoginAdmin = ({ setShowTokenInput }: AdminTokenProps) => {
  const router = useRouter();
  const { mutate: login, isLoading: loading, isError, serverError, setServerError } = useTokenMutation(router);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TokenValues>({
    resolver: yupResolver(tokenSchema),
  });


  function onSubmit({ token }: TokenValues) {
    login(token);
    if (!isError) {
      setShowTokenInput(false);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {serverError && (
          <Alert
            message={t(`${serverError && serverError}`)}
            variant="error"
            closeable={true}
            className="my-5"
            onClose={() => setServerError(null)}
          />
        )}

        <Input
          label={t("form:token-label")}
          {...register("token")}
          variant="outline"
          className="mb-5"
          error={t(errors.token?.message!)}
        />
        <Button className="w-full h-11" loading={loading} disabled={loading}>
          {t("form:text-submit-token")}
        </Button>
     
      </form>
    </>
  );
};

export default LoginForm;
