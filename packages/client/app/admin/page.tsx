import { fetchPosts } from "@/api/posts";
import AdminPosts from "./AdminPosts";

interface HomeProps {
  searchParams: {
    page: number;
    search: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const postData = await fetchPosts({ ...searchParams, limit: 15 });

  return <AdminPosts posts={postData.posts} total={postData.total} />;
}
