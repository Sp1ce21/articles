"use client";

import React, { memo } from "react";
import { Pagination as MaterialPagination } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  total: number;
}

const Pagination: React.FC<PaginationProps> = ({ total }) => {
  const count = Math.ceil(total / 10);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const allParamsString = Array.from(params.entries()).reduce(
    (acc, [key, value]) => {
      if (key === "page") return acc;

      acc += `&${key}=${value}`;
      return acc;
    },
    "",
  );

  const onPaginate = (e: React.ChangeEvent<unknown>, value: number) => {
    router.push(`${pathname}/?page=${value}${allParamsString}`);
  };

  if (count < 2) {
    return null;
  }

  return (
    <MaterialPagination
      count={count}
      variant="outlined"
      shape="rounded"
      color="primary"
      className="mb-20 flex justify-center"
      onChange={onPaginate}
      page={+(params.get("page") || 1)}
    />
  );
};

export default memo(Pagination);
