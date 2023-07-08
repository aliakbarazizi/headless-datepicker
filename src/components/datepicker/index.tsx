import { Button, ButtonProps } from './button/Button';
import { Header, HeaderProps } from './header/Header';
import { Input, InputProps } from './input/Input';
import { Item, ItemProps } from './item/Item';
import { Items, ItemsProps } from './items/Items';
import { Picker, PickerProps } from './picker/Picker';
import {
  ProviderProps as DatepickerProps,
  Provider,
} from './provider/Provider';

const Datepicker = Object.assign(Provider, {
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

export type * from '../../context/context';

export default Datepicker;
