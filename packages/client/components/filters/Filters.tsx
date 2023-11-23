"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { memo } from "react";
import CustomInput from "../ui/inputs/CustomInput";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { Button } from "@mui/material";

interface FiltersProps {}

const Filters: React.FC<FiltersProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const allParamsString = Array.from(params.entries()).reduce(
    (acc, [key, value]) => {
      if (key === "search") return acc;

      acc += `${key}=${value}&`;
      return acc;
    },
    "?",
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    values: {
      search: params.get("search"),
    },
  });

  const onSubmit = (data: FieldValues) => {
    const { search } = data;

    router.push(`${pathname}/${allParamsString}search=${search}`);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="item-center flex w-full gap-4">
        <div className="w-full max-w-[400px]">
          <CustomInput
            id="search"
            label="Search"
            register={register}
            errors={errors}
          />
        </div>
        <Button
          variant="outlined"
          className="py-[7px]"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default memo(Filters);
