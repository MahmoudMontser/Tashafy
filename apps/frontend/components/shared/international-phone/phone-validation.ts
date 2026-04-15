import { isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js";

/** True when `value` is a valid number in E.164 form (as produced by `react-international-phone`). */
export function isValidInternationalPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return isValidPhoneNumber(trimmed);
}

/** Returns canonical E.164 or `null` if invalid / empty. */
export function toValidE164(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = parsePhoneNumberFromString(trimmed);
  if (!parsed?.isValid()) return null;
  return parsed.format("E.164");
}
