import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const validatePhoneNumber = (value) => {
  try {
    const phone = parsePhoneNumberFromString(value);
    return phone?.isValid() ?? false;
  } catch {
    return false;
  }
};
