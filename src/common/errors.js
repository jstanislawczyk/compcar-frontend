export const parseGraphQlErrorMessage = (error) => {
  return error.message
    ? error.message.split(':')[1].trim()
    : error.message;
};
