import { fetchPosts } from "@/api/posts";
import Posts from "@/components/posts/Posts";

interface HomeProps {
  searchParams: {
    page: number;
    search: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const postData = await fetchPosts(searchParams);

  return <Posts posts={postData.posts} total={postData.total} />;
}
