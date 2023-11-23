import React, { memo } from "react";
import { Post } from "@prisma/client";
import { convertDateToDDMMYYYY } from "@/utils/convertDateToDDMMYYYY";

interface PostItemProps {
  item: Post;
}

const PostItem: React.FC<PostItemProps> = ({ item }) => {
  return (
    <div key={item.id}>
      <h2 className="mb-4 text-xl font-semibold">{item.title}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: item.description }}
        className="mb-5 flex flex-col gap-3"
      />
      {!!item.categories.length && (
        <div className="mb-4 flex gap-2">
          {item.categories.map(category => (
            <div key={category} className="rounded-lg bg-slate-200 px-2 py-1">
              {category}
            </div>
          ))}
        </div>
      )}
      <p className="mb-8 text-slate-400">
        {convertDateToDDMMYYYY(item.createdAt)}
      </p>
      <hr />
    </div>
  );
};

export default memo(PostItem);
