import * as XLSX from 'xlsx';

import { GraphResponseType } from 'types';

export const exportToExcel = (data: GraphResponseType[], title: string) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Data');
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title}.xlsx`;
  a.click();
  URL.revokeObjectURL(url);
};

export const arraysDeepEqual = (arr1: GraphResponseType[], arr2: GraphResponseType[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i += 1) {
    const item1 = arr1[i];
    const item2 = arr2[i];

    if (JSON.stringify(item1) !== JSON.stringify(item2)) {
      return false;
    }
  }

  return true;
};

export const articleNameValidator = (name: string) => {
  if (!name) {
    return 'Name required';
  }
  if (name.length < 8) {
    return 'Name min 8 words';
  }
  if (name.length > 100) {
    return 'Name max 100 words';
  }
  return '';
};

export const articleFieldValidator = (field: string) => {
  if (!field) {
    return 'Field required';
  }
  if (field.length < 8) {
    return 'Field min 8 words';
  }
  if (field.length > 100) {
    return 'Field max 100 words';
  }
  return '';
};
