import { CustomError } from "../types/types";

const createError = (status: number, message: string) => {
  const error = new CustomError(message, status);
  return error;
};

export default createError;
