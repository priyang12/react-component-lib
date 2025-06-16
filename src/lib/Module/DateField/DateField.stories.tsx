import DateField from './DateField';
import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';
export default {
   title: 'Atoms/DateField',
   component: DateField,
   args: {
      label: 'Date',
      id: 'date',
   },
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof DateField>;

export const Template: StoryFn<typeof DateField> = (args) => {
   const [date, setDate] = React.useState<Date>(new Date());
   return <DateField {...args} date={date} setDate={setDate} />;
};

export const FormateDate = Template.bind({});
FormateDate.args = {
   formattedDate: 'MM/YYYY/DD',
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
            inputProps={{ name: 'Date' }}
            hiddenInput={true}
         />
         <button type="submit">Submit</button>
      </form>
   );
};
