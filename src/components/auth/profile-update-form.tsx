import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import Button from "@components/ui/button";
import Description from "@components/ui/description";
import Card from "@components/common/card";
import { useUpdateUserMutation } from "@data/user/use-user-update.mutation";
import TextArea from "@components/ui/text-area";
import { useTranslation } from "next-i18next";
import FileInput from "@components/ui/file-input";
import pick from "lodash/pick";

type FormValues = {
  fullname: string;
  description:  string;
  phone: string;
  email: string;
  profile: {
    id: string;
    // bio: string;
    contact: string;
    avatar: {
      thumbnail: string;
      original: string;
      id: string;
    };
  };
};

export default function ProfileUpdate({ me }: any) {
  const { t } = useTranslation();
  const { mutate: updateUser, isLoading: loading } = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      ...(me &&
        pick(me[0], ["fullname", "description", "phone", "email"])),
    },
  });

  async function onSubmit(values: FormValues) {
    const { fullname, profile, description, phone, email } = values;
    updateUser({
      variables: {
        id: me?.id,
        input: {
          fullname,
          description,
          phone,
          email,
          profile: {
            id: me?.profile?.id,
            // bio: profile?.bio,
            // contact: profile?.contact,
            avatar: {
              thumbnail: profile?.avatar?.thumbnail,
              original: profile?.avatar?.original,
              id: profile?.avatar?.id,
            },
          },
        },
      },
    });
  }


 

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t("form:input-label-avatar")}
          details={t("form:avatar-help-text")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="profile.avatar" control={control} multiple={false} />
        </Card>
      </div>

      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t("form:form-title-information")}
          details={t("form:profile-info-help-text")}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3 mb-5">
          <Input
            label={t("form:input-label-name")}
            {...register("fullname")}
            error={t(errors.fullname?.message!)}
            variant="outline"
            className="mb-5"
            value={me[0]?.fullname}
          />
          <TextArea
            label={t("form:input-label-bio")}
            {...register("description")}
            error={t(errors.description?.message!)}
            variant="outline"
            className="mb-6"
            value={me[0]?.description}
          />
          <Input
            label={t("form:input-label-email")}
            {...register("email")}
            error={t(errors.email?.message!)}
            variant="outline"
            className="mb-5"
            value={me[0]?.email}
          />
          <Input
            label={t("form:input-label-contact")}
            {...register("phone")}
            error={t(errors.phone?.message!)}
            variant="outline"
            className="mb-5"
            value={me[0]?.phone}
          />
        </Card>
    

        <div className="w-full text-end">
          <Button loading={loading} disabled={loading}>
            {t("form:button-label-save")}
          </Button>
        </div>
      </div>
    </form>
  );
}
