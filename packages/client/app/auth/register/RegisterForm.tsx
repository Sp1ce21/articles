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
import { fetchRegister } from "@/api/auth";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface RegisterFormProps {}

const registerSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password should be at least 6 characters" }),
    confirmPassword: z
      .string({ required_error: "Password confirmation is required" })
      .min(6, { message: "Password should be at least 6 characters" }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

const RegisterForm: React.FC<RegisterFormProps> = () => {
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
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation(fetchRegister, {
    onSuccess: data => {
      saveToken(data);
      toast.success("Account successfully created");
      router.push("/");
      router.refresh();
    },
    onError: error => {
      console.error("Error logging in", error);
    },
  });

  const onSubmit = (data: FieldValues) => {
    const { email, password, confirmPassword } = data;
    mutation.mutate({ email, password, confirmPassword });
  };

  return (
    <div className="px-6 py-10">
      <h1 className="mb-8 text-center text-3xl font-semibold">Register</h1>
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
      <div className="mb-4">
        <CustomInput
          id="confirmPassword"
          label="Confirm Password"
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
          Sign up
        </Button>
      </div>
      <p>
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default memo(RegisterForm);
