import { countryRules } from "./countryRules";

export function validatePhone(countryCode, phone) {
  const rule = countryRules[countryCode];

  if (!rule) return false;

  return (
    phone.length >= rule.min &&
    phone.length <= rule.max
  );
}