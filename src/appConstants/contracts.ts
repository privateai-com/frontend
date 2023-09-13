import { Network } from './network';

export const contracts = {
  [Network.MaticTest]: {
    Benture: process.env.NEXT_PUBLIC_POLYGON_BENTURE as string,
    Admin: process.env.NEXT_PUBLIC_POLYGON_BENTURE_ADMIN as string, 
    Factory: process.env.NEXT_PUBLIC_POLYGON_BENTURE_FACTORY as string, 
    Salary: process.env.NEXT_PUBLIC_POLYGON_BENTURE_SALARY as string, 
    Dex: process.env.NEXT_PUBLIC_POLYGON_BENTURE_DEX as string, 
  },
};
