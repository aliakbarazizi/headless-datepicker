import { Datepicker as DatepickerRoot, DatepickerProps } from './Datepicker';
import { Input, InputProps } from './Input';
import { Header, HeaderProps } from './Header';
import { Button, ButtonProps } from './Button';
import { Item, ItemProps } from './Item';
import { Items, ItemsProps } from './Items';
import { Picker, PickerProps } from './Picker';

const Datepicker = Object.assign(DatepickerRoot, {
  Picker,
  Input,
  Header,
  Button,
  Items,
  Item,
});

export type {
  DatepickerProps,
  PickerProps,
  InputProps,
  HeaderProps,
  ButtonProps,
  ItemsProps,
  ItemProps,
};

export type * from './context';

export default Datepicker;
