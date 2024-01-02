import type { Meta, StoryObj } from '@storybook/react';
import { Item } from './Item';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Datepicker/Item',
  component: Item,
  tags: ['autodocs'],
  argTypes: {
    as: {
      table: {
        defaultValue: {
          summary: 'div',
        },
      },
    },
  },
  parameters: {
    showDatepicker: true,
  },
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DateItem = {
  parameters: {
    override: {
      item: `{item}`,
    },
  },
  args: {
    item: {
      type: 'day',
      isInCurrentMonth: true,
      isDisabled: false,
      disabled: false,
      isSelected: false,
      isHeader: false,
      isToday: false,
      key: 0,
      text: '1',
      value: new Date(),
    },
  },
} satisfies Story;
