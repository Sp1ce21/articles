"use client";

import Container from "@/components/container/Container";
import CustomInput from "@/components/ui/inputs/CustomInput";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import { fetchEditPost } from "@/api/posts";
import { Post } from "@prisma/client";
import { z } from "zod";

interface EditPostProps {
  post: Post;
}

const postSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Title is required"),
});

const EditPost: React.FC<EditPostProps> = ({ post }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    values: {
      title: post.title,
      description: post.description,
    },
    resolver: zodResolver(postSchema),
  });

  const mutation = useMutation(fetchEditPost, {
    onSuccess: data => {
      if (!data) {
        toast.error("Something went wrong");
        return;
      }
      toast.success("Post successfully edited");
      router.refresh();
    },
    onError: error => {
      console.log("Error logging in", error);
    },
  });

  const onSubmit = (data: FieldValues) => {
    const { title, description } = data;
    mutation.mutate({ title, description, id: post.id });
  };

  return (
    <Container>
      <h1 className="mb-6 mt-4 text-center text-3xl">Edit post</h1>
      <div className="mb-3">
        <CustomInput
          id="title"
          label="Title"
          register={register}
          errors={errors}
        />
      </div>
      <div className="mb-3">
        <CustomInput
          id="description"
          label="Description"
          multiline
          register={register}
          errors={errors}
        />
      </div>
      <Button
        variant="outlined"
        onClick={handleSubmit(onSubmit)}
        disabled={mutation.isLoading}
      >
        Edit
      </Button>
    </Container>
  );
};

export default EditPost;
