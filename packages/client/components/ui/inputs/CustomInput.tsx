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

interface CustomInputProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  id: string;
  label: string;
  variant?: InputStyleTypes;
  fullWidth?: boolean;
  className?: string;
  type?: InputTypes;
  defaultValue?: string | number
}

const CustomInput: React.FC<CustomInputProps> = ({
  register,
  id,
  variant = InputStyleTypes.OUTLINED,
  type = InputTypes.TEXT,
  errors,
  ...prop
}) => {
  return (
    <TextField
      id={id}
      error={!!errors[id]}
      helperText={(errors[id]?.message || "") as string}
      type={type}
      size='small'
      variant={variant}
      fullWidth
      {...register(id)}
      {...prop}
    />
  );
};

export default memo(CustomInput);
