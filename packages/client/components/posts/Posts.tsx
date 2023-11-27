import React from "react";
import { Post } from "@prisma/client";
import Container from "../container/Container";
import PostItem from "./Post";
import Pagination from "../pagination/Pagination";
import Filters from "../filters/Filters";

interface PostsProps {
  posts: Post[];
  total: number;
}

const Posts: React.FC<PostsProps> = ({ posts, total }) => {
  return (
    <Container>
      <h1 className="mb-12 mt-8 text-center text-4xl font-bold">Posts</h1>
      <div className="mb-6">
        <Filters />
      </div>
      <div className="mb-10 flex flex-col gap-8">
        {posts?.length !== 0 ? (
          posts?.map(post => <PostItem item={post} key={post.id} />)
        ) : (
          <p className="text-center">There are no posts</p>
        )}
      </div>
      <Pagination total={total} />
    </Container>
  );
};

export default Posts;
