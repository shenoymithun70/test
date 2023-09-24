export const requiredValidation = (values, label) => {
  if (!values) {
    // return `Required ${label}`;
    return `Required field`;
  }
};
