import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '.';

const meta: Meta<typeof Tabs> = {
  title: 'Common/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const tabsContent = [
  {
    key: 'projects',
    label: 'Projects',
    component: <p>Projects</p>,
  },
  {
    key: 'investments',
    label: 'Investments',
    component: <p>Investments</p>,
  },
  {
    key: 'salaries',
    label: 'Salaries',
    component: <p>Salaries</p>,
  },
  {
    key: 'customDistribution',
    label: 'Custom distribution',
    component: <p>Custom distribution</p>,
  },
];

export const Standard: Story = {
  args: {
    defaultKey: 'projects',
    tabs: tabsContent,
  },
};
