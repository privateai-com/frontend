import { z } from 'zod';

export const UserSchema = z.object({
  file: z.custom<File>(),
  username: z.string({
    required_error: 'Username is required',
    invalid_type_error: 'Username must be a string',
  })
    .max(100, { message: 'Username max 100 characters' })
    .nullable(),
  fullName: z.string({
    required_error: 'Real name is required',
    invalid_type_error: 'Real name must be a string',
  })
    .max(100, { message: 'Real name max 100 characters' })
    .nonempty(),
  socialLink: z.string()
    .max(100, { message: 'Social link max 100 characters' })
    .url()
    .or(z.literal('')),
  organization: z.string({
    required_error: 'Organization is required',
    invalid_type_error: 'Organization must be a string',
  })
    .max(100, { message: 'Organization max 100 characters' })
    .nonempty(),
  researchFields: z.string({
    required_error: 'Research fields is required',
    invalid_type_error: 'Research fields must be a string',
  })
    .max(100, { message: 'Research fields max 100 characters' })
    .nonempty(),
  position: z.string({
    required_error: 'Position is required',
    invalid_type_error: 'Position must be a string',
  })
    .max(100, { message: 'Position max 100 characters' })
    .nonempty(),
  country: z.string({
    required_error: 'Country is required',
    invalid_type_error: 'Country must be a string',
  })
    .max(100, { message: 'Country max 100 characters' })
    .optional()
    .nullable(),
}).required({
  fullName: true,
  file: true,
  organization: true,
  researchFields: true,
  position: true,
});
