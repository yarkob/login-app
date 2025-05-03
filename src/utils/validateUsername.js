export const validateUsername = (value) => {
  if (!value) {
    return 'Username is required';
  }

  if (value.length < 3) {
    return 'Username should have at least 3 characters';
  }

  if (value.length > 20) {
    return 'Username should have less than 20 characters';
  }
}
