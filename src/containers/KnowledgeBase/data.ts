type StatusProps =
  | 'Open sourced'
  | 'Permission given'
  | 'Permission needed'
  | 'Access request pending'
  | 'Access denied';

type ItemProp = {
  name: string;
  field: string;
  author: string;
  core: string[];
  status: StatusProps;
  created: string;
  modified: string;
};

export const items: ItemProp[] = [];

const statuses: StatusProps[] = [
  'Open sourced',
  'Permission given',
  'Permission needed',
  'Access request pending',
  'Access denied'
];

let count = 0;
for (let i = 0; i < 7; i += 1) {
  if (count > 4) count = 0;
  items.push({
    name: 'New breakthroughs in gene therapy',
    field: 'Gene therapy',
    author: 'Ray Smith',
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
