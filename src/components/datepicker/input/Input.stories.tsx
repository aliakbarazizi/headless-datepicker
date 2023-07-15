import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Datepicker/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    as: {
      table: {
        defaultValue: {
          summary: 'input',
        },
      },
    },
  },
  parameters: {
    showDatepicker: true,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputDateHour: Story = {
  args: {
    format: 'yyyy/MM/dd HH:mm',
    className:
      'flex w-60 rounded-md p-2 shadow-sm outline-none ring-1 ring-gray-500 focus-within:ring-2 focus-within:ring-blue-600',
  },
};

export const InputDate: Story = {
  args: {
    format: 'yyyy/MM/dd',
    className:
      'flex w-60 rounded-md p-2 shadow-sm outline-none ring-1 ring-gray-500 focus-within:ring-2 focus-within:ring-blue-600',
  },
};

export const InputHour: Story = {
  args: {
    format: 'HH:mm',
    className:
      'flex w-60 rounded-md p-2 shadow-sm outline-none ring-1 ring-gray-500 focus-within:ring-2 focus-within:ring-blue-600',
  },
};
