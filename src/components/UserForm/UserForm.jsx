import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { useEffect } from "react";

export const UserForm = ({ initialValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues || { name: "", email: "", phone: "" },
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        {...register("name", {
          required: "Name is required",
          minLength: { value: 3, message: "Min 3 characters" },
        })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register("email", {
          required: "Email is required",
          pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Phone"
        fullWidth
        margin="normal"
        {...register("phone", {
          pattern: { value: /^[0-9\-+() ]*$/, message: "Invalid phone number" },
        })}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};
