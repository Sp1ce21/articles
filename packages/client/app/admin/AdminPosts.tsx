import React from "react";
import { Post } from "@prisma/client";
import Container from "@/components/container/Container";
import Pagination from "@/components/pagination/Pagination";
import AdminPostItem from "./AdminPostItem";
import Filters from "@/components/filters/Filters";
import Link from "next/link";
import { Button } from "@mui/material";

interface AdminPostsProps {
  posts: Post[];
  total: number;
}

const AdminPosts: React.FC<AdminPostsProps> = ({ posts, total }) => {
  return (
    <Container>
      <div className="mb-8 mt-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Filters />
          </div>

          <Link href="/admin/create" className="whitespace-nowrap">
            <Button>Add post</Button>
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          {posts.length ? (
            posts.map(post => <AdminPostItem key={post.id} item={post} />)
          ) : (
            <p className="text-center">There are no items</p>
          )}
        </div>
      </div>

      <Pagination total={total} />
    </Container>
  );
};

export default AdminPosts;
