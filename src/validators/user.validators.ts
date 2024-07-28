import Joi from "joi";

export const userCreateValidator = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string()
      .valid("buyer", "seller", "company", "client", "admin")
      .required(),
  });
  return schema.validate(data);
};

export const userLoginValidator = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
