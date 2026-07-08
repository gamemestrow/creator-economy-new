export const ROLES = {
  CREATOR: "creator",
  STUDENT: "attendee",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];