import * as yup from "yup";
export const customerValidationSchema = yup.object().shape({
  fullname: yup.string().required("form:error-fullname-required"),
  email: yup
    .string()
    .email("form:error-email-format")
    .required("form:error-email-required"),
  password: yup.string().required("form:error-password-required"),
});
