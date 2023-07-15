import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { storyToJsx } from '../../../utils/story';
import { Input } from '../input/Input';
import { InputDateHour } from '../input/Input.stories';
import { Picker } from '../picker/Picker';
import { DateHourPicker } from '../picker/Picker.stories';
import { Provider } from './Provider';

const ProviderWithHooks = (args: any) => {
  const [value, setVaue] = useState<Date | null>(new Date());
  const ref = useRef(null);

  return (
    <Provider {...args} value={value} onChange={setVaue}>
      <Input {...InputDateHour.args} ref={ref} />
      <Picker {...DateHourPicker.args} attachTo={ref} />
    </Provider>
  );
};

const meta = {
  title: 'Datepicker/Provider',
  component: Provider,
  tags: ['autodocs'],
  parameters: {
    showPreview: false,
  },
  argTypes: {
    as: {
      table: {
        defaultValue: {
          summary: 'React.Fragment',
        },
      },
    },
  },
  render: (args) => <ProviderWithHooks {...args} />,
} satisfies Meta<typeof Provider>;

export default meta;
type Story = StoryObj<typeof Provider>;

export const DatePicker = {
  parameters: {
    override: {
      children: `${storyToJsx(InputDateHour, {}, 'Input', 1)}
  ${storyToJsx(DateHourPicker, { alwaysOpen: false }, 'Picker', 1)}`,
      value: '{value}',
      onChange: '{setValue}',
    },
  },
  args: {},
} satisfies Story;
