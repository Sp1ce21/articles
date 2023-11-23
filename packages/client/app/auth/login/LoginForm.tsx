"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import React, { memo } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import CustomInput, { InputTypes } from "@/components/ui/inputs/CustomInput";
import { useMutation } from "react-query";
import { fetchLogin } from "@/api/auth";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface LoginFormProps {}

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password should be at least 6 characters" }),
});

const LoginForm: React.FC<LoginFormProps> = () => {
  const { saveToken } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation(fetchLogin, {
    onSuccess: data => {
      saveToken(data);
      toast.success("Logged in");
      router.push("/");
      router.refresh();
    },
    onError: error => {
      console.error("Error logging in", error);
    },
  });

  const onSubmit = (data: FieldValues) => {
    const { email, password } = data;
    mutation.mutate({ email, password });
  };

  return (
    <div className="px-6 py-10">
      <h1 className="mb-8 text-center text-3xl font-semibold">Login</h1>
      <div className="mb-4">
        <CustomInput
          id="email"
          label="Email"
          register={register}
          errors={errors}
        />
      </div>
      <div className="mb-4">
        <CustomInput
          id="password"
          label="Password"
          type={InputTypes.PASSWORD}
          register={register}
          errors={errors}
        />
      </div>
      <div className="mb-6">
        <Button
          size="large"
          fullWidth
          onClick={handleSubmit(onSubmit)}
          disabled={mutation.isLoading}
        >
          Sign in
        </Button>
      </div>
      <p>
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default memo(LoginForm);
