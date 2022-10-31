import Select from "@components/ui/select/select";
import React from "react";
import { useTranslation } from "next-i18next";
import cn from "classnames";
import { useTypesQuery } from "@data/type/use-types.query";
import { useNewCategoriesQuery } from "@data/category/use-categories.query";

type Props = {
  onTypeFilter: Function;
  className?: string;
};

export default function TypeFilter({ onTypeFilter, className }: Props) {
  const { t } = useTranslation();

  const { data, isLoading: loading } = useTypesQuery();
  const {data: newData} = useNewCategoriesQuery();


  return (
    <div className={cn("flex w-full", className)}>
      <div className="w-full">
        <Select
          options={newData?.categories}
          isLoading={loading}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.slug}
          placeholder={t("common:filter-by-group-placeholder")}
           //@ts-ignore
          onChange={onTypeFilter}
        />
      </div>
    </div>
  );
}
