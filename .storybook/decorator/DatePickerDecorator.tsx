import { Decorator } from '@storybook/react';

export default function DateConfigDecorator(): Decorator<Datepicker> {
  return (
    <Datepicker theme="default">
      {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
      <Story />
    </Datepicker>
  );
}
