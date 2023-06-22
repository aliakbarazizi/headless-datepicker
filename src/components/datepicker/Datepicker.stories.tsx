import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Datepicker from '.';
import { classNames } from '../../utils/class-names';
import { config } from '../../jalali/config';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Example/Datepicker',
  component: Datepicker,
  tags: ['autodocs'],

  // argTypes: { backgroundColor: { control: 'color' } },
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Datepicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const ArrowLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    className="h-4 w-4 fill-current"
  >
    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
  </svg>
);

const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    className="h-4 w-4 fill-current"
  >
    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
  </svg>
);

const ComponentWrapper = (jalali: boolean) => {
  const Component = (args: any) => {
    const [value, setVaue] = useState<Date | null>(new Date());
    const [rerender, setRerender] = useState<number>(0);

    console.count('ComponentWrapper');

    return (
      <div style={{ height: 500 }} dir={jalali ? 'rtl' : 'ltr'}>
        <button
          className="mb-4 block w-full border text-center"
          onClick={() => setRerender((r) => r + 1)}
        >
          {rerender}
        </button>
        <Datepicker
          {...args}
          as="div"
          config={jalali ? config : undefined}
          startOfWeek={jalali ? 6 : 0}
          value={value}
          onChange={setVaue}
        >
          <Datepicker.Input
            format="yyyy/MM/dd HH:mm"
            dir="ltr"
            className="flex w-60 rounded-md p-2 shadow-sm outline-none ring-1 ring-gray-500 focus-within:ring-2 focus-within:ring-blue-600"
          />
          <Datepicker.Picker
            alwaysOpen
            className="rounded-md bg-white p-4 shadow-md dark:bg-gray-800 dark:text-gray-300"
          >
            {({ monthName, hour, minute, mode, year }) => (
              <>
                <div className="flex w-full items-center justify-between space-x-6 py-2 rtl:space-x-reverse">
                  <Datepicker.Button
                    action="prev"
                    className="rounded-full p-2 text-sm font-medium hover:bg-gray-700 hover:text-white rtl:rotate-180"
                  >
                    <ArrowLeft />
                  </Datepicker.Button>
                  <div className="flex">
                    <Datepicker.Button
                      action="toggleHour"
                      className="leading-2 p-2 text-lg font-semibold hover:bg-gray-700 hover:text-white"
                    >
                      {('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2)}
                    </Datepicker.Button>
                    <Datepicker.Button
                      action="toggleDayMonth"
                      className="leading-2 w-28 p-2 text-lg font-semibold hover:bg-gray-700 hover:text-white"
                    >
                      {monthName}
                    </Datepicker.Button>
                    <Datepicker.Button
                      action="toggleDayYear"
                      className="leading-2 p-2 text-lg font-semibold hover:bg-gray-700 hover:text-white"
                    >
                      {year}
                    </Datepicker.Button>
                  </div>
                  <Datepicker.Button
                    action="next"
                    className="rounded-full p-2 text-sm font-medium hover:bg-gray-700 hover:text-white rtl:rotate-180"
                  >
                    <ArrowRight />
                  </Datepicker.Button>
                </div>
                <Datepicker.Items
                  type={mode}
                  className={classNames(
                    'grid auto-rows-max gap-4 overflow-y-auto scroll-smooth',
                    mode == 'day' && 'grid-cols-7',
                    mode == 'month' && 'grid-cols-3',
                    mode == 'year' && 'max-h-[274px] grid-cols-4',
                  )}
                >
                  {({ items, isSelected }) =>
                    items.map((item) => (
                      <Datepicker.Item
                        key={item.key}
                        item={item}
                        className={classNames(
                          'flex items-center justify-center rounded-full py-1.5 text-sm font-medium hover:bg-gray-700',
                          item.disabled ? 'text-gray-500' : 'hover:text-white',
                          isSelected(item) && 'bg-gray-600',
                          item.isToday && 'border border-gray-500',
                        )}
                      >
                        {item.isHeader
                          ? item.text.substring(0, jalali ? 1 : 2)
                          : item.text}
                      </Datepicker.Item>
                    ))
                  }
                </Datepicker.Items>
                <Datepicker.Button
                  action="today"
                  className="mt-4 w-full bg-blue-700 p-2 text-sm font-medium hover:bg-blue-600"
                >
                  Today
                </Datepicker.Button>
                <Datepicker.Picker
                  hourPicker
                  className="flex max-h-56 rounded-md border border-gray-600 bg-white py-2 shadow-md rtl:flex-row-reverse dark:bg-gray-800 dark:text-gray-300"
                >
                  <Datepicker.Items
                    type="hour"
                    className="overflow-y-auto scroll-smooth px-4"
                  >
                    {({ items, isSelected }) =>
                      items.map((item) => (
                        <Datepicker.Item
                          key={item.key}
                          item={item}
                          className={classNames(
                            'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium hover:bg-gray-700 hover:text-white',
                            isSelected(item) && 'bg-gray-600',
                          )}
                        >
                          {('0' + item.text).slice(-2)}
                        </Datepicker.Item>
                      ))
                    }
                  </Datepicker.Items>
                  <Datepicker.Items
                    type="minute"
                    className="overflow-y-auto scroll-smooth px-4"
                  >
                    {({ items, isSelected }) =>
                      items.map((item) => (
                        <Datepicker.Item
                          key={item.key}
                          item={item}
                          className={classNames(
                            'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium hover:bg-gray-700 hover:text-white',
                            isSelected(item) && 'bg-gray-600',
                          )}
                        >
                          {('0' + item.text).slice(-2)}
                        </Datepicker.Item>
                      ))
                    }
                  </Datepicker.Items>
                </Datepicker.Picker>
              </>
            )}
          </Datepicker.Picker>
        </Datepicker>
      </div>
    );
  };
  return Component;
};

const ComponentWrapperPure = () => {
  const Component = () => {
    const [value, setVaue] = useState<Date | null>(new Date());

    return (
      <div style={{ height: 500 }}>
        <Datepicker value={value} onChange={setVaue}>
          <Datepicker.Input format="yyyy/MM/dd HH:mm" />
          <Datepicker.Picker>
            {({ monthName, hour, minute, mode, year }) => (
              <>
                <Datepicker.Button action="prev">
                  <ArrowLeft />
                </Datepicker.Button>
                <Datepicker.Button action="toggleHour">
                  {('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2)}
                </Datepicker.Button>
                <Datepicker.Button action="toggleDayMonth">
                  {monthName}
                </Datepicker.Button>
                <Datepicker.Button action="toggleDayYear">
                  {year}
                </Datepicker.Button>
                <Datepicker.Button action="next">
                  <ArrowRight />
                </Datepicker.Button>

                <Datepicker.Items type={mode}>
                  {({ items }) =>
                    items.map((item) => (
                      <Datepicker.Item key={item.key} item={item}>
                        {item.text}
                      </Datepicker.Item>
                    ))
                  }
                </Datepicker.Items>
                <Datepicker.Picker hourPicker>
                  <Datepicker.Items type="hour">
                    {({ items }) =>
                      items.map((item) => (
                        <Datepicker.Item key={item.key} item={item}>
                          {('0' + item.value).slice(-2)}
                        </Datepicker.Item>
                      ))
                    }
                  </Datepicker.Items>
                  <Datepicker.Items type="minute">
                    {({ items }) =>
                      items.map((item) => (
                        <Datepicker.Item key={item.key} item={item}>
                          {('0' + item.value).slice(-2)}
                        </Datepicker.Item>
                      ))
                    }
                  </Datepicker.Items>
                </Datepicker.Picker>
              </>
            )}
          </Datepicker.Picker>
        </Datepicker>
      </div>
    );
  };
  return Component;
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: ComponentWrapper(false),
  args: {},
};

export const Jalali: Story = {
  render: ComponentWrapper(true),
  args: {},
};

export const Tesdt: Story = {
  render: ComponentWrapperPure(),
  args: {},
};

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
// export const OneItem: Story = {
//   render: (args) => (
//     <List {...args}>
//       <ListItem />
//     </List>
//   ),
// };

// export const ManyItems: Story = {
//   render: (args) => (
//     <List {...args}>
//       <ListItem />
//       <ListItem />
//       <ListItem />
//     </List>
//   ),
// };
