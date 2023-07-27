# React Date Picker

[![npm version](https://badge.fury.io/js/@aliakbarazizi%2Fheadless-datepicker.svg)](https://badge.fury.io/js/@aliakbarazizi%2Fheadless-datepicker)
[![npm](https://img.shields.io/npm/dm/%40aliakbarazizi/headless-datepicker)](https://www.npmjs.com/package/@aliakbarazizi/headless-datepicker)

<p align="center">
  <img src='https://github.com/aliakbarazizi/headless-datepicker/raw/main/media/screenshot.png'/>
</p>

The Headless Datepicker is a powerful and flexible tool designed for ReactJS applications.
It allows developers to create customizable and visually appealing datepickers with ease.
Unlike traditional datepickers, this component is "headless," meaning it provides the core functionality
and logic while allowing developers to design their own user interface.

## Features

- **Datepicker, Hourpicker, and Calendar Modes:**
  The component supports multiple modes, including datepicker, hourpicker, and calendar modes, allowing users to select dates, hours, or navigate through a full calendar.

- **Headless Design:**
  The component follows a headless architecture, separating the logic from the presentation layer. This enables developers to design and customize the user interface according to their application's specific needs.

- **Multi Picker Support:**
  The component allows for nesting multiple pickers within each other, enabling advanced and complex selection scenarios.

- **Keyboard Navigation:**
  Users can easily navigate and interact with the datepicker using keyboard shortcuts, enhancing accessibility and improving the user experience.

- **Written in TypeScript with Type Support:**
  The component is written in TypeScript, providing strong typing and enabling developers to benefit from type-checking during development.

- **Support for other Calendar Types with Config:**
  The component provides support for other calendar types through configuration options. Developers can customize the calendar type based on their requirements.

- **Built-in Config for Jalali Calendar:**
  The component comes with a built-in configuration for the Jalali calendar, making it easy to implement and use the Jalali calendar system.

## Installation

The package can be installed via [npm](https://github.com/npm/cli):

```
npm install @aliakbarazizi/headless-datepicker --save
```

Or via [yarn](https://github.com/yarnpkg/yarn):

```
yarn add @aliakbarazizi/headless-datepicker
```

## Usage

Import Datepicker component

```js
import Datepicker from '@aliakbarazizi/headless-datepicker';
```

## Basic example

```jsx
<Datepicker>
  <Datepicker.Input />
  <Datepicker.Picker defaultType="day">
    {({ monthName, hour, minute, year }) => (
      <>
        <Datepicker.Button action="prev">Prev</Datepicker.Button>
        <Datepicker.Button action="next">Next</Datepicker.Button>
        <Datepicker.Items>
          {({ items }) =>
            items.map((item) => (
              <Datepicker.Item key={item.key} item={item}>
                {item.text}
              </Datepicker.Item>
            ))
          }
        </Datepicker.Items>
      </>
    )}
  </Datepicker.Picker>
</Datepicker>
```

## Using other calendar types (e.g., Jalali) with Headless Datepicker

The Headless Datepicker library provides the flexibility to support various calendar types, allowing you to tailor the datepicker based on your specific regional requirements. To use a custom calendar type or the built-in Jalali calendar, follow these simple steps:

### Configuration Object

Manually create a configuration object for your desired calendar type or use the internal Jalali configuration provided by the library.

- For the Jalali calendar:
  ```js
  import { config } from '@aliakbarazizi/headless-datepicker/jalali';
  ```
- For custom calendar:
  create a config object base on [config](https://github.com/aliakbarazizi/headless-datepicker/blob/main/src/utils/config.ts)

### Pass Configuration to Datepicker

Use the config prop to pass your configuration to the Datepicker component.

```jsx
<Datepicker config={config}>...</Datepicker>
```

## Documentation

Please see the [https://aliakbarazizi.github.io/headless-datepicker/](https://aliakbarazizi.github.io/headless-datepicker/)

## License

Licensed under MIT license, see [LICENSE](LICENSE) for the full license.
