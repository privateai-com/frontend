import type { Meta, StoryObj } from '@storybook/react';

import { Table } from '.';

const meta: Meta<typeof Table> = {
  title: 'Common/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const DataTable = [...Array(10).keys()].map(() => ({
  id: '123',
  project: 'Anna',
  launchDate: '23/12/2022',
  saleStatus: 'Ongoing',
  saleProgress: 20,
  tokenUSDprice: '3',
  USDMarketCap: '50 000',
  isMultiple: false,
}));

const columns = [
  {
    Header: 'Project',
    accessor: 'project',
  },
  {
    Header: 'Launch date',
    accessor: 'launchDate',
  },
  {
    Header: 'Sale status',
    accessor: 'saleStatus',
  },
  {
    Header: 'Sale progress',
    accessor: 'saleProgress',
  },
  {
    Header: 'Token USD price',
    accessor: 'tokenUSDprice',
  },
  {
    Header: 'USD Market cap',
    accessor: 'USDMarketCap',
  },
  {
    Header: () => null,
    accessor: 'id',
  },
];

export const Standard: Story = {
  args: {
    columns,
    data: DataTable,
  },
};
