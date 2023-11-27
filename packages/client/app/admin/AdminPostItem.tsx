"use client";

import React, { memo, useCallback } from "react";
import { Post } from "@prisma/client";
import { Button } from "@mui/material";
import { convertDateToDDMMYYYY } from "@/utils/convertDateToDDMMYYYY";
import { fetchDeletePost } from "@/api/posts";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AdminPostItemProps {
  item: Post;
}

const AdminPostItem: React.FC<AdminPostItemProps> = ({ item }) => {
  const router = useRouter();

  const onDelete = useCallback(() => {
    fetchDeletePost(item.id).then(() => {
      router.refresh();
    });
  }, [item, router]);

  return (
    <div className="flex items-center justify-between">
      <p className="font-semibold">{item.title}</p>
      <div className="flex items-center gap-2">
        <p className="text-slate-400">
          {convertDateToDDMMYYYY(item.createdAt)}
        </p>
        <Link href={`/admin/edit/${item.id}`}>
          <Button>Edit</Button>
        </Link>
        <Button variant="outlined" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default memo(AdminPostItem);
