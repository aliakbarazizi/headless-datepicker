# React Date Picker

[![npm version](https://badge.fury.io/js/@aliakbarazizi%2Fheadless-datepicker.svg)](https://badge.fury.io/js/@aliakbarazizi%2Fheadless-datepicker)
![npm](https://img.shields.io/npm/dm/%40aliakbarazizi/headless-datepicker)

Headless datepicker and hourpicker for React

## Installation

The package can be installed via [npm](https://github.com/npm/cli):

```
npm install @aliakbarazizi/headless-datepicker --save
```

Or via [yarn](https://github.com/yarnpkg/yarn):

```
yarn add @aliakbarazizi/headless-datepicker
```

```ts
import DatePicker from '@aliakbarazizi/headless-datepicker';

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
        <Datepicker.Button action="toggleDayYear">{year}</Datepicker.Button>
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
</Datepicker>;
```

## Components

### DatePicker

| prop                       | type                            | default   | description                                                                |
| -------------------------- | ------------------------------- | --------- | -------------------------------------------------------------------------- |
| defaultValue               | `Date`                          | undefined | uncontrolled default value                                                 |
| value                      | `Date`                          | undefined | controlled value                                                           |
| onChange                   | `(value: Date \| null) => void` | undefined | trigger when value is changed                                              |
| disabledKeyboardNavigation | `boolean`                       | true      | TODO                                                                       |
| disabled                   | `boolean`                       | false     | determin whether the input is disabled                                     |
| config                     | `DatePickerConfig`              | undefined | Date picker configuration please see [DatePickerConfig](#DatePickerConfig) |
| startOfWeek                | `number`                        | undefined | if the value is undefined it will be base on the local date                |

## License

Copyright (c) 2014-2023 HackerOne Inc. and individual contributors. Licensed under MIT license, see [LICENSE](LICENSE) for the full license.
