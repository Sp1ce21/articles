import { TextField } from "@mui/material";
import React, { memo } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export enum InputStyleTypes {
  OUTLINED = "outlined",
  FILLED = "filled",
  STANDARD = "standard",
}

export enum InputTypes {
  PASSWORD = "password",
  TEXT = "text",
  EMAIL = "email",
  NUMBER = "number",
}

export enum InputSizes {
  MEDIUM = "medium",
  SMALL = "small",
}

interface CustomInputProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  id: string;
  label: string;
  variant?: InputStyleTypes;
  fullWidth?: boolean;
  className?: string;
  size?: InputSizes;
  type?: InputTypes;
  multiline?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  register,
  id,
  variant = InputStyleTypes.OUTLINED,
  type = InputTypes.TEXT,
  size = InputSizes.MEDIUM,
  errors,
  ...prop
}) => {
  return (
    <TextField
      id={id}
      error={!!errors[id]}
      helperText={(errors[id]?.message || "") as string}
      type={type}
      size={size}
      variant={variant}
      fullWidth
      {...register(id)}
      {...prop}
    />
  );
};

export default memo(CustomInput);
