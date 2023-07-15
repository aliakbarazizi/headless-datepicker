import { shift } from '@floating-ui/core';
import { offset } from '@floating-ui/react-dom';
import type { Meta, StoryObj } from '@storybook/react';
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
            'mt-4 w-full bg-blue-700 p-2 text-sm font-medium hover:bg-blue-600',
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
    ...DatePicker.args,
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
            'mt-4 w-full bg-blue-700 p-2 text-sm font-medium hover:bg-blue-600',
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
