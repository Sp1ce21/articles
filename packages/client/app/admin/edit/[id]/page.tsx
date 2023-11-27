import { fetchPostById } from "@/api/posts";
import EditPost from "./EditPost";

interface EditPostPageProps {
  params: {
    id: string;
  };
}

const EditPostPage: React.FC<EditPostPageProps> = async ({ params }) => {
  const post = await fetchPostById(params.id);

  return <EditPost post={post} />;
};

export default EditPostPage;
