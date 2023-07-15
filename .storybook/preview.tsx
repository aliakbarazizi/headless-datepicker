import { withThemeByClassName } from '@storybook/addon-styling';
import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks';
import type { Preview, StoryContext } from '@storybook/react';
import { themes } from '@storybook/theming';
import type { DecoratorFunction } from '@storybook/types';
import { useEffect, useState } from 'react';
import { Datepicker } from '../src/components/datepicker';
import {
  DayMonth,
  DayYear,
  Next,
  Prev,
  Today,
  Toggle,
} from '../src/components/datepicker/button/Button.stories';
import { InputDateHour } from '../src/components/datepicker/input/Input.stories';
import { DateItems } from '../src/components/datepicker/items/Items.stories';
import {
  DateHourPicker,
  HourPicker,
} from '../src/components/datepicker/picker/Picker.stories';
import { config } from '../src/jalali/config';
import { classNames } from '../src/utils/class-names';
import { addProvider, storyToJsx } from '../src/utils/story';
import '../src/style.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: themes.dark,
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
      source: {
        transform: (_code: string, storyContext: StoryContext) => {
          const displayName = storyContext.component!.displayName || '';
          const isRoot = displayName === 'Datepicker';

          const code = storyToJsx(storyContext, {}, displayName, 0);

          return isRoot ? code : addProvider(code);
        },
      },
    },
    options: {
      storySort: {
        order: [
          'Get started',
          'Datepicker',
          [
            'Provider',
            'Picker',
            ['Docs', 'Date Hour Picker', 'Date Picker', 'Hour Picker'],
            'Button',
            'Input',
            'Items',
            'Item',
          ],
        ],
        includeNames: true,
      },
    },
    jsx: {
      showFunctions: true,
    },
  },
  argTypes: {
    children: {
      control: false,
    },
    as: {
      control: false,
    },
    className: {
      control: false,
    },
  },
};

export default preview;

export const decorators: DecoratorFunction<any>[] = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'dark',
  }),
  (Story, { parameters }) => {
    const [value, setVaue] = useState<Date | null>(new Date());

    const [isJalali, setIsJalali] = useState(
      localStorage.getItem('isJalali') == '1',
    );

    useEffect(() => {
      localStorage.setItem('isJalali', isJalali ? '1' : '0');
    }, [isJalali]);

    if (parameters.showPreview === false) {
      return (
        <div className="h-[560px] flex justify-center items-start p-4">
          <Story />
        </div>
      );
    }

    parameters.isJalali = isJalali;

    return (
      <div className="flex h-full min-h-[560px]">
        <Datepicker
          key={isJalali ? 'jalali' : 'normal'}
          config={isJalali ? config : undefined}
          startOfWeek={isJalali ? 6 : 0}
          value={value}
          onChange={setVaue}
        >
          <div
            className="overflow-y-auto relative flex justify-center items-start flex-1 p-4"
            dir={isJalali ? 'rtl' : 'ltr'}
          >
            <Story />
          </div>
          <div
            className={classNames(
              'p-2 border-gray-500/20 flex flex-col items-center space-y-4',
              parameters.showDatepicker ? 'border-l' : 'self-start',
            )}
          >
            <div className="flex space-x-4">
              {parameters.showDatepicker && (
                <Datepicker.Input {...InputDateHour.args} />
              )}
              <button
                className="p-2 text-sm hover:bg-gray-700 hover:text-white ml-auto block border rounded-md border-gray-500"
                onClick={() => setIsJalali(!isJalali)}
              >
                Toggle jalali
              </button>
            </div>
            {parameters.showDatepicker && (
              <>
                <Datepicker.Picker {...DateHourPicker.args}>
                  {({ monthName, hour, minute, year }) => (
                    <>
                      <div className="flex w-full items-center justify-between space-x-6 py-2 rtl:space-x-reverse">
                        <Datepicker.Button {...Prev.args} />
                        <div className="flex">
                          <Datepicker.Button {...Toggle.args}>
                            {('0' + hour).slice(-2) +
                              ':' +
                              ('0' + minute).slice(-2)}
                          </Datepicker.Button>
                          <Datepicker.Button {...DayMonth.args}>
                            {monthName}
                          </Datepicker.Button>
                          <Datepicker.Button {...DayYear.args}>
                            {year}
                          </Datepicker.Button>
                        </div>
                        <Datepicker.Button {...Next.args} />
                      </div>
                      <Datepicker.Items {...DateItems.args} type={undefined} />
                      <Datepicker.Button
                        {...Today.args}
                        className="mt-4 w-full bg-blue-700 p-2 text-sm font-medium hover:bg-blue-600"
                      />
                      <Datepicker.Picker
                        {...HourPicker.args}
                        alwaysOpen={false}
                      />
                    </>
                  )}
                </Datepicker.Picker>
              </>
            )}
          </div>
        </Datepicker>
      </div>
    );
  },
];
