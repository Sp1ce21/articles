"use client";

import Container from "@/components/container/Container";
import CustomInput from "@/components/ui/inputs/CustomInput";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import { fetchCreatePost } from "@/api/posts";

interface CreatePostPageProps {}

const postSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Title is required"),
});

const CreatePostPage: React.FC<CreatePostPageProps> = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(postSchema),
  });

  const mutation = useMutation(fetchCreatePost, {
    onSuccess: data => {
      if (!data) {
        toast.error("Something went wrong");
        return;
      }
      toast.success("Post successfully created");
      reset();
      router.refresh();
    },
    onError: error => {
      console.log("Error logging in", error);
    },
  });

  const onSubmit = (data: FieldValues) => {
    const { title, description } = data;
    mutation.mutate({ title, description });
  };

  return (
    <Container>
      <h1 className="mb-6 mt-4 text-center text-3xl">Add post</h1>
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
        Create
      </Button>
    </Container>
  );
};

export default CreatePostPage;
