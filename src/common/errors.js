export const parseGraphQlErrorMessage = (error) => {
  return error.message.split(':')[1].trim();
};
