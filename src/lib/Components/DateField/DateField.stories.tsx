import DateField from './DateField';
import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Label } from '../Label';

export default {
   title: 'Components/DateField',
   component: DateField,
   args: {
      label: 'Date',
      id: 'date',
   },
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof DateField>;

export const Template: StoryFn<typeof DateField> = (args) => {
   const [date, setDate] = React.useState<Date>(new Date());
   return (
      <div className="flex flex-col">
         <Label className="label" htmlFor={'Date'}>
            Date
         </Label>
         <DateField {...args} date={date} setDate={setDate} />
      </div>
   );
};

export const FormateDate = Template.bind({});
FormateDate.args = {
   formatted: 'MM/YYYY/DD',
};

export const FieldStyled = Template.bind({});
FieldStyled.args = {
   FieldInputStyles: {
      padding: '20px',
   },
};

export const WithForm: StoryFn<typeof DateField> = (args) => {
   const [date, setDate] = React.useState<Date>(new Date());
   return (
      <form
         onSubmit={(e: any) => {
            e.preventDefault();
            console.log(e.currentTarget.elements.Date.value);
         }}
      >
         <DateField
            {...args}
            date={date}
            setDate={setDate}
            hiddenInputProps={{ name: 'Date' }}
            hiddenInput={true}
         />
         <button type="submit">Submit</button>
      </form>
   );
};
