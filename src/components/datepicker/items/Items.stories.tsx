import type { Meta, StoryObj } from '@storybook/react';
import { classNames } from '../../../utils/class-names';
import { Item } from './../item/Item.tsx';
import { Items } from './Items';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Datepicker/Items',
  component: Items,
  tags: ['autodocs'],
  argTypes: {
    as: {
      table: {
        defaultValue: {
          summary: 'div',
        },
      },
    },
    className: {
      control: false,
      table: {
        type: {
          summary: `string | ((slot: DatepickerSlot & {
            items: ItemsType[];
            type: Type;
          }) => string)`,
        },
      },
    },
    children: {
      control: false,
      table: {
        type: {
          summary: `ReactNode | ((slot: DatepickerSlot & {
            items: ItemsType[];
            type: Type;
          }) => ReactNode)`,
        },
      },
    },
  },
  parameters: {
    showDatepicker: true,
  },
  decorators: [
    (Story, { args }) => {
      return (
        <div
          className={classNames(
            args.type !== 'hour' && args.type !== 'minute'
              ? 'p-4 w-[352px]'
              : 'max-h-56 overflow-y-auto',
            'rounded-md bg-white shadow-md dark:bg-gray-800 dark:text-gray-300 relative flex justify-center items-start',
          )}
        >
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Items>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DateItems = {
  parameters: {
    override: {
      className: `{({ type }) =>
    classNames(
      'grid w-full auto-rows-max gap-4 overflow-y-auto scroll-smooth',
      type == 'day' && 'grid-cols-7',
      type == 'month' && 'grid-cols-3',
      type == 'year' && 'max-h-[274px] grid-cols-4',
    )
  }`,
      children: `{({ items }) =>
    items.map((item) => (
      <Datepicker.Item
        key={item.key}
        item={item}
        className={classNames(
          'grid items-center justify-center rounded-full py-1.5 text-sm font-medium select-none',
          item.isHeader ? 'cursor-default' : 'hover:bg-gray-700',
          item.disabled ? 'text-gray-500' : 'hover:text-white',
          item.type === 'day' && 'h-8 w-8',
          item.isSelected && 'bg-gray-600',
          item.isToday && 'border border-gray-500',
        )}
      >
        {item.isHeader ? item.text.substring(0, 2) : item.text}
      </Datepicker.Item>
    ))
  }`,
    },
  },
  argTypes: {
    type: {
      options: ['day', 'month', 'year'],
      control: { type: 'radio' },
    },
  },
  args: {
    type: 'day',
    className: ({ type }) =>
      classNames(
        'grid w-full auto-rows-max gap-4 overflow-y-auto scroll-smooth',
        type == 'day' && 'grid-cols-7',
        type == 'month' && 'grid-cols-3',
        type == 'year' && 'max-h-[274px] grid-cols-4',
      ),
    children: ({ items }) =>
      items.map((item) => (
        <Item
          key={item.key}
          item={item}
          className={classNames(
            'flex items-center justify-center rounded-full py-1.5 text-sm font-medium select-none',
            item.isHeader ? 'cursor-default' : 'hover:bg-gray-700',
            item.disabled ? 'text-gray-500' : 'hover:text-white',
            item.type === 'day' && 'h-8 w-8',
            item.isSelected && 'bg-gray-600',
            item.isToday && 'border border-gray-500',
          )}
        >
          {item.isHeader ? item.text.substring(0, 2) : item.text}
        </Item>
      )),
  },
} satisfies Story;

export const HourItems = {
  parameters: {
    override: {
      children: `{({ items }) =>
    items.map((item) => (
      <Datepicker.Item
        key={item.key}
        item={item}
        className={classNames(
          'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium hover:bg-gray-700 hover:text-white',
          item.isSelected && 'bg-gray-600',
        )}
      >
        {('0' + item.text).slice(-2)}
      </Datepicker.Item>
    ))
  }`,
    },
  },
  argTypes: {
    type: {
      options: ['hour', 'minute'],
      control: { type: 'radio' },
    },
  },
  args: {
    type: 'hour',
    className: 'overflow-y-auto scroll-smooth px-4',
    disableAutoScroll: true,
    children: ({ items }) =>
      items.map((item) => (
        <Item
          key={item.key}
          item={item}
          className={classNames(
            'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium hover:bg-gray-700 hover:text-white',
            item.isSelected && 'bg-gray-600',
          )}
        >
          {('0' + item.text).slice(-2)}
        </Item>
      )),
  },
} satisfies Story;
