export type ProfileUpdateData = {
  username: string;
  socialLink?: string;
  organization: string;
  position: string;
  researchFields: string;
  fullName: string;
  country?: string;
  callback?: () => void;
};
