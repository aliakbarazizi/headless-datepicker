import { Button, ButtonProps, ComponentButton } from './button/Button';
import { ComponentInput, Input, InputProps } from './input/Input';
import { ComponentItem, Item, ItemProps } from './item/Item';
import { ComponentItems, Items, ItemsProps } from './items/Items';
import { ComponentPicker, Picker, PickerProps } from './picker/Picker';
import {
  ProviderProps as DatepickerProps,
  Provider,
} from './provider/Provider';

export type {
  DatepickerProps,
  PickerProps,
  InputProps,
  ButtonProps,
  ItemsProps,
  ItemProps,
};

export type * from '../../context/context';

const Datepicker = Object.assign(Provider, {
  Picker: Picker as ComponentPicker,
  Input: Input as ComponentInput,
  Button: Button as ComponentButton,
  Items: Items as ComponentItems,
  Item: Item as ComponentItem,
});

export { Datepicker };
