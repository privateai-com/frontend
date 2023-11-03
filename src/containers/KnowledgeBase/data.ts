import { Status } from 'types';

type ItemProp = {
  id: number;
  name: string;
  field: string;
  authorName: string;
  authorUserName: string;
  core: string[];
  status: Status;
  created: string;
  modified: string;
};

export const items: ItemProp[] = [];

const statuses: Status[] = [
  'Open sourced',
  'Access granted',
  'Permission needed',
  'Access request pending',
  'Access denied',
];

let count = 0;
for (let i = 0; i < 7; i += 1) {
  if (count > 4) count = 0;
  items.push({
    id: count,
    name: 'New breakthroughs in gene therapy',
    field: 'Gene therapy',
    authorName: 'Ray Smith',
    authorUserName: 'Ray Smith',
    core: [
      'Healthcare',
      'Drug discovery',
      'Genetics',
      'Artificial Intelligence',
      'Clinical trials',
      'DNA research',
    ],
    status: statuses[count],
    created: '20 may 2023',
    modified: '20 may 2023',
  });
  count += 1;
}
