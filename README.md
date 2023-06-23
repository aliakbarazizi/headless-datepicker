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

## Usage

Import Datepicker component

```js
import Datepicker from '@aliakbarazizi/headless-datepicker';
```

## Basic example

```jsx
<Datepicker>
  <Datepicker.Input />
  <Datepicker.Picker>
    {({ monthName, hour, minute, mode, year }) => (
      <>
        <Datepicker.Button action="prev">Prev</Datepicker.Button>
        <Datepicker.Button action="next">Next</Datepicker.Button>
        <Datepicker.Items type={mode}>
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

## Documentation

Please see the [https://aliakbarazizi.github.io/headless-datepicker/](https://aliakbarazizi.github.io/headless-datepicker/)

## License

Licensed under MIT license, see [LICENSE](LICENSE) for the full license.
