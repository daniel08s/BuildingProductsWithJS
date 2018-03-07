export const loginErrorToMessage = (error) => {
  if (error.status === 401) {
    return 'Wrong login credentials. Please, try again.';
  }

  return error.message;
};

export const genericErrorToMessage = (error) => {
  if (error.response && error.response.error) {
    return error.response.error;
  }

  if (error.status === 403) {
    return 'Oops, something went wrong. Please, try again!';
  }

  return error.message;
};
