import { withThemeByClassName } from '@storybook/addon-styling';
import type { Decorator, Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import DatePickerDecorator from './decorator/DatePickerDecorator';
import '../src/style.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: themes.dark,
    },
  },
};

export default preview;

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'dark',
  }),
  DatePickerDecorator,
];
