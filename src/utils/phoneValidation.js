import { countryRules } from "../utils/countryRules";

export const validatePhone = (countryCode, phone) => {
  const rule = countryRules[countryCode];

  if (!rule) return false;

  const cleanedPhone = phone.replace(/\D/g, "");

  return cleanedPhone.length === rule.phoneLength;
};