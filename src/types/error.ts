interface CustomError extends Error {
  errorStatus: number;
  errorMessage: string;
}

export default CustomError;
