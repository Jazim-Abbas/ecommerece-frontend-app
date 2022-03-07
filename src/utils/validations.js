import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export const registerSchema = yup.object().shape({
  name: yup.string().min(5).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export const profileSchema = yup.object().shape({
  name: yup.string().notRequired(),
  city: yup.string().notRequired(),
  phone: yup.string().notRequired(),
  about: yup.string().notRequired(),
  address: yup.string().required(),
  country: yup.string().notRequired(),
  dateOfBirth: yup.date().notRequired(),
});
