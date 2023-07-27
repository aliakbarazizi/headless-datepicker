import { shift } from '@floating-ui/core';
import { offset } from '@floating-ui/react-dom';
import type { Meta, StoryObj } from '@storybook/react';
import { classNames } from '../../../utils/class-names';
import { storyToJsx } from '../../../utils/story';
import { Button } from '../button/Button';
import {
  DayMonth,
  DayYear,
  Next,
  Prev,
  Today,
  Toggle,
} from '../button/Button.stories';
import { Item } from '../item/Item';
import { Items } from '../items/Items';
import { DateItems, HourItems } from '../items/Items.stories';
import { Picker } from './Picker';

const meta = {
  title: 'Datepicker/Picker',
  component: Picker,
  tags: ['autodocs'],
  argTypes: {
    as: {
      table: {
        defaultValue: {
          summary: 'React.Fragment',
        },
      },
    },
    middleware: {
      table: {
        type: {
          summary: 'Array<Middleware | null | undefined | false>',
        },
      },
    },
  },
} satisfies Meta<typeof Picker>;

export default meta;
type Story = StoryObj<typeof Picker>;

export const DatePicker = {
  parameters: {
    override: {
      children: `{({ monthName, year }) => (
    <>
      <div className="flex w-full items-center justify-between space-x-6 py-2 rtl:space-x-reverse">
        ${storyToJsx(Prev, {}, 'Button', 4)}
        <div className="flex">
          ${storyToJsx(DayMonth, { children: '{monthName}' }, 'Button', 5)}
          ${storyToJsx(DayYear, { children: '{year}' }, 'Button', 5)}
        </div>
        ${storyToJsx(Next, {}, 'Button', 4)}
      </div>
      ${storyToJsx(DateItems, { type: false }, 'Items', 3)}
      ${storyToJsx(
        Today,
        {
          className:
            '"mt-4 w-full bg-blue-700 p-2 text-sm font-medium hover:bg-blue-600"',
        },
        'Button',
        3,
      )}
    </>
  )}`,
      middleware: false,
    },
  },
  args: {
    defaultType: 'day',
    alwaysOpen: true,
    className:
      'rounded-md bg-white p-4 shadow-md dark:bg-gray-800 dark:text-gray-300 w-[352px]',
    middleware: [offset(10), shift()],
    children: ({ monthName, year }) => (
      <>
        <div className="flex w-full items-center justify-between space-x-6 py-2 rtl:space-x-reverse">
          <Button {...Prev.args} />
          <div className="flex">
            <Button {...DayMonth.args}>{monthName}</Button>
            <Button {...DayYear.args}>{year}</Button>
          </div>
          <Button {...Next.args} />
        </div>
        <Items {...DateItems.args} type={undefined} />
        <Button
          {...Today.args}
          className="mt-4 w-full bg-blue-700 p-2 text-sm font-medium hover:bg-blue-600"
        />
      </>
    ),
  },
} satisfies Story;

export const HourPicker = {
  parameters: {
    override: {
      children: `${storyToJsx(HourItems, { type: '"hour"' }, 'Items', 1)}
  ${storyToJsx(HourItems, { type: '"minute"' }, 'Items', 1)}`,
      middleware: false,
    },
  },
  args: {
    className:
      'flex max-h-56 rounded-md border border-gray-600 bg-white py-2 shadow-md rtl:flex-row-reverse dark:bg-gray-800 dark:text-gray-300',
    children: (
      <>
        <Items {...HourItems.args} type="hour" />
        <Items {...HourItems.args} type="minute" />
      </>
    ),
  },
} satisfies Story;

export const DateHourPicker: Story = {
  parameters: {
    override: {
      children: `{({ monthName, hour, minute, year }) => (
    <>
      <div className="flex w-full items-center justify-between space-x-6 py-2 rtl:space-x-reverse">
        ${storyToJsx(Prev, {}, 'Button', 4)}
        <div className="flex">
          ${storyToJsx(
            Toggle,
            {
              children:
                "{('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2)}",
            },
            'Button',
            5,
          )}
          ${storyToJsx(DayMonth, { children: '{monthName}' }, 'Button', 5)}
          ${storyToJsx(DayYear, { children: '{year}' }, 'Button', 5)}
        </div>
        ${storyToJsx(Next, {}, 'Button', 4)}
      </div>
      ${storyToJsx(DateItems, { type: false }, 'Items', 3)}
      ${storyToJsx(
        Today,
        {
          className:
            '"mt-4 w-full bg-blue-700 p-2 text-sm font-medium hover:bg-blue-600"',
        },
        'Button',
        3,
      )}
      ${storyToJsx(HourPicker, {}, 'Picker', 3)}
    </>
  )}`,
      middleware: false,
    },
  },
  args: {
    ...DatePicker.args,
    children: ({ monthName, hour, minute, year }) => (
      <>
        <div className="flex w-full items-center justify-between space-x-6 py-2 rtl:space-x-reverse">
          <Button {...Prev.args} />
          <div className="flex">
            <Button {...Toggle.args}>
              {('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2)}
            </Button>
            <Button {...DayMonth.args}>{monthName}</Button>
            <Button {...DayYear.args}>{year}</Button>
          </div>
          <Button {...Next.args} />
        </div>
        <Items {...DateItems.args} type={undefined} />
        <Button
          {...Today.args}
          className="mt-4 w-full bg-blue-700 p-2 text-sm font-medium hover:bg-blue-600"
        />
        <Picker {...HourPicker.args} alwaysOpen={false} />
      </>
    ),
  },
};

export const Calendar: Story = {
  parameters: {
    override: {
      children: `{({ monthName, year }) => (
    <>
      <div className="flex w-full items-center justify-between space-x-6 py-2 rtl:space-x-reverse">
        ${storyToJsx(Prev, {}, 'Button', 4)}
        <div className="flex">
          ${storyToJsx(
            Toggle,
            {
              children:
                "{('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2)}",
            },
            'Button',
            5,
          )}
          ${storyToJsx(DayMonth, { children: '{monthName}' }, 'Button', 5)}
          ${storyToJsx(DayYear, { children: '{year}' }, 'Button', 5)}
        </div>
        ${storyToJsx(Next, {}, 'Button', 4)}
      </div>
      ${storyToJsx(DateItems, { type: false }, 'Items', 3)}
      ${storyToJsx(
        Today,
        {
          className:
            '"mt-4 w-full bg-blue-700 p-2 text-sm font-medium hover:bg-blue-600"',
        },
        'Button',
        3,
      )}
    </>
  )}`,
      middleware: false,
    },
  },
  args: {
    alwaysOpen: true,
    defaultType: 'day',
    className:
      'flex flex-col w-full h-full bg-white dark:bg-gray-800 dark:text-gray-300 absolute inset-0 p-4',
    children: ({ monthName, year }) => (
      <>
        <div className="flex w-full items-center py-2 mt-6 border-b border-gray-700 rtl:space-x-reverse">
          <Button {...Prev.args} />
          <div className="mx-4">{monthName}</div>
          <Button {...Next.args} />
          <div className="ml-auto flex items-center">
            <Button {...Toggle.args}>
              <div>{year}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                className="h-4 w-4 fill-current"
              >
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </svg>
            </Button>
          </div>
        </div>
        <Items className="grid flex-1 w-full gap-4 overflow-y-auto scroll-smooth grid-cols-7 auto-rows-fr">
          {({ items }) =>
            items.map((item) => (
              <Item
                key={item.key}
                item={item}
                className={classNames(
                  'flex items-center justify-center rounded-md py-1.5 text-sm font-medium select-none',
                  item.isHeader ? 'cursor-default' : 'hover:bg-gray-700',
                  item.disabled ? 'text-gray-500' : 'hover:text-white',
                  item.isSelected && 'bg-gray-600',
                  item.isToday && 'border border-gray-500',
                )}
              >
                {item.isHeader ? item.text.substring(0, 2) : item.text}
              </Item>
            ))
          }
        </Items>
        <Picker className="flex max-h-56 rounded-md border border-gray-600 bg-white py-2 shadow-md rtl:flex-row-reverse dark:bg-gray-800 dark:text-gray-300">
          <Items
            className="grid grid-cols-4 auto-rows-max overflow-y-auto scroll-smooth px-2"
            type="year"
          >
            {({ items }) =>
              items.map((item) => (
                <Item
                  key={item.key}
                  item={item}
                  className={classNames(
                    'flex p-2 items-center justify-center text-sm font-medium hover:bg-gray-700 hover:text-white',
                    item.isSelected && 'bg-gray-600',
                  )}
                >
                  {item.text}
                </Item>
              ))
            }
          </Items>
        </Picker>
      </>
    ),
  },
};
