export type ProfileUpdateData = {
  username: string;
  phone: string;
  socialLink: string;
  organization: string;
  scientificTitle: string;
  position: string;
  researchFields: string;
  fullName: string;
  country: string;
  city: string;
  timeZone: string;
  callback?: () => void;
};
