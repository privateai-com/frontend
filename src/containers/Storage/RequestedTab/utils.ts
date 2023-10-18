import { arrowDownSquare, xSquareIcon } from 'assets';

export const getStatusStyle = (
  status: string,
  styles: {
    readonly [key: string]: string;
  },
) => {
  switch (status) {
    case 'Open sourced':
      return styles.open;

    case 'Access granted':
      return styles.granted;

    case 'Permission needed':
      return styles.permission_needed;

    case 'Access request pending':
      return styles.pending;

    case 'Access denied':
      return styles.denied;

    default:
      return styles.item_status;
  }
};

export const getStatusImg = (status: string) => {
  switch (status) {
    case 'Access granted':
      return arrowDownSquare;

    case 'Access request pending':
      return xSquareIcon;

    case 'Access denied':
      return xSquareIcon;

    default:
      return arrowDownSquare;
  }
};
