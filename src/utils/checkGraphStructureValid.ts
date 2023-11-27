import { GraphResponseType } from 'types';

export const checkGraphStructureValid = (data: GraphResponseType[]) => (
  data.every((obj) => 
    typeof obj === 'object' &&
    Object.prototype.hasOwnProperty.call(obj, 'subject') &&
    Object.prototype.hasOwnProperty.call(obj, 'verb') &&
    Object.prototype.hasOwnProperty.call(obj, 'object') &&
    Object.prototype.hasOwnProperty.call(obj, 'uncertainty') &&
    Object.prototype.hasOwnProperty.call(obj, 'comment'))
);
