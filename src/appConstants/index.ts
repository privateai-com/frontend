export * from './api';
export * from './contracts';
export * from './routes';
export * from './network';
export * from './notifications';
export * from './wallets';
export * from './regex';
export * from './errorsNotification';
export * from './graphData';
export * from './tabs';

export const decimalPlaces = 6;
export const decimalPlacesForFee = 8;

export const itemsOnPageQuantity = 10;

export const addressZero = '0x0000000000000000000000000000000000000000';

export enum ScreenWidth {
  desktop1920 = 1920,
  desktop1440 = 1440,
  notebook1024 = 1024,
  mobile = 576,
  bigMobile = 768,
}

export const countRowsOnPage = 10;

export const authErrorWords = [
  'username',
  'password',
  'email',
  'code',
  'check',
] as const;
