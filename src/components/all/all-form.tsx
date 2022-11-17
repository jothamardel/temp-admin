import Input from "@components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import Button from "@components/ui/button";
import Description from "@components/ui/description";
import FileInput from "@components/ui/file-input";
import Card from "@components/common/card";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Attribute } from "@ts-types/generated";
import { useShopQuery } from "@data/shop/use-shop.query";
import { useCreateAttributeMutation } from "@data/attributes/use-attribute-create.mutation";
import { useUpdateAttributeMutation } from "@data/attributes/use-attribute-update.mutation";
import { useState } from "react";
import Alert from "@components/ui/alert";
// @ts-ignore
import { animateScroll } from "react-scroll";
import TextArea from "@components/ui/text-area";
import Radio from "@components/ui/radio/radio";
import Label from "@components/ui/label";


type FormValues = {
  name?: string | null;
  description: string;
  values: any;
  zip?: string;
  city: string;
  state: string;
  country: string;
  street_address: string;
  is_active: boolean;
  is_service: boolean;
  cover_image: string;
  logo: string;
};

type IProps = {
  initialValues?: Attribute | null;
};
export default function CreateOrUpdateAllForm({ initialValues }: IProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    query: { shop },
  } = router;
  const { t } = useTranslation();
  const { data: shopData } = useShopQuery(shop as string, { enabled: !!shop });
  // @ts-ignore
  const shopId = shopData?.shop?.id!;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialValues ? initialValues : { name: "", values: [] },
  });
  
  // @ts-ignore
  const { fields, append, remove } = useFieldArray({
    control,
    name: "values",
  });
  // @ts-ignore
  const { mutate: createAttribute, isLoading: creating } =
    useCreateAttributeMutation();
    // @ts-ignore
  const { mutate: updateAttribute, isLoading: updating } =
    useUpdateAttributeMutation();

  const onSubmit = (values: FormValues) => {
    console.log(values);
    // if (!initialValues) {
    //   createAttribute(
    //     {
    //       variables: {
    //         input: {
    //           name: values.name!,
    //           shop_id: Number(shopId),
    //           values: values.values,
    //         },
    //       },
    //     },
    //     {
    //       onError: (error: any) => {
    //         setErrorMessage(error?.response?.data?.message);
    //         // @ts-ignore
    //         animateScroll.scrollToTop();
    //       },
    //     }
    //   );
    // } else {
    //   updateAttribute({
    //     variables: {
    //       id: initialValues.id,
    //       input: {
    //         name: values.name!,
    //         shop_id: Number(initialValues?.shop_id),
    //         values: values.values.map(({ id, value, meta }: any) => ({
    //           id: Number(id),
    //           value,
    //           meta,
    //         })),
    //       },
    //     },
    //   });
    // }
  };

  return (
    <>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title={t("common:shop")}
            details={`${
              initialValues
                ? t("form:item-description-update")
                : t("form:item-description-add")
            } ${t("shop title")}`}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={t("form:input-label-name")}
              {...register("name", { required: "Name is required" })}
              error={t(errors.name?.message!)}
              variant="outline"
              className="mb-5"
            />
          </Card>
        </div>

        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={t("Cover image")}
            details={ t("")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <FileInput name="cover_image" control={control} multiple={false} />
          </Card>
        </div>

        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={t("Logo")}
            details={ t("")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <FileInput name="logo" control={control} multiple={false} />
          </Card>
        </div>
        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={t("Active")}
            details={ t("")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div className="flex">
              <Radio id="active" {...register("is_active")}/>
              <Label>{t("active")}</Label>
            </div>
    
          </Card>
        </div>
        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={t("Zipcode")}
            details={ t("")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={t("Zip")}
              {...register("zip")}
              error={t(errors.zip?.message!)}
              variant="outline"
              className="mb-5"
            />

    
          </Card>
        </div>
        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={t("City")}
            details={ t("")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <select {...register("city")} className="px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border">
              <option>Please select</option>
              <option value="1">city 1</option>
              <option value="2">city 2</option>
              <option value="3">city 3</option>
              <option value="4">city 4</option>
            </select>
          </Card>
        </div>
        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={t("State")}
            details={ t("")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <select {...register("state")} className="px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border">
              <option>Please select</option>
              <option value="1">state 1</option>
              <option value="2">state 2</option>
              <option value="3">state 3</option>
              <option value="4">state 4</option>
            </select>
          </Card>
        </div>
        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={t("Country")}
            details={ t("")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <select {...register("country")} className="px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border">
              <option>Please select</option>
              <option value="1">country 1</option>
              <option value="2">country 2</option>
              <option value="3">country 3</option>
              <option value="4">country 4</option>
            </select>
          </Card>
        </div>
        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={t("Address")}
            details={ t("")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={t("Street address")}
              {...register("street_address")}
              error={t(errors.street_address?.message!)}
              variant="outline"
              className="mb-5"
            />

    
          </Card>
        </div>
        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={t("Is service")}
            details={ t("")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <div className="flex">
              <Radio id="is_service" {...register("is_service")}/>
              <Label>{"Service"}</Label>
            </div>
          </Card>
        </div>
        <div className="flex flex-wrap my-5 sm:my-8">
          <Description
            title={t("Shop description")}
            details={ t("")}
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <TextArea {...register("description")}/>
          </Card>
        </div>

        <div className="mb-4 text-end">
          {/* {initialValues && (
            <Button
              variant="outline"
              onClick={router.back}
              className="me-4"
              type="button"
            >
              {t("form:button-label-back")}
            </Button>
          )} */}

          <Button loading={creating || updating}>
            <>
              {initialValues
                ? t("form:item-description-update")
                : t("form:item-description-add")}{" "}
              {t("common:shop")}
            </>
          </Button>
        </div>
      </form>
    </>
  );
}
