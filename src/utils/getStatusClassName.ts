import { Status } from 'types';

export const getStatusStyle = (
  status: Status,
  styles: {
    readonly [key: string]: string;
  },
) => {
  switch (status) {
    case 'Open sourced':
      return styles.open;

    case 'Permission given':
      return styles.permission_given;

    case 'Permission needed':
      return styles.permission_needed;

    case 'Access request pending':
      return styles.pending;

    default:
      return styles.item_status;
  }
};
