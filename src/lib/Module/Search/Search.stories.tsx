import Button from '../../Atoms/Button/Button';
import Input from '../../Atoms/Input/Input';
import Label from '../../Atoms/Label/Label';
import Search from './Search';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useThrottle } from '../../../Hooks/useThrottle';
import { useState } from 'react';

export default {
   title: 'Module/Search',
   component: Search,
   decorators: [story => <div className="container">{story()}</div>],
   subcomponents: {
      Button,
      Input,
      Label,
   },
} as ComponentMeta<typeof Search>;

export const Template: ComponentStory<typeof Search> = args => {
   const [Value, setValue] = useState('');
   const throttledVal = useThrottle(Value, 1000);
   return (
      <Search
         onSubmit={(e: any) => {
            e.preventDefault();
            console.log(throttledVal);
         }}
         {...args}
         className="bg-transparent"
         LabelComponent={
            <Label htmlFor="Search" hidden>
               Search Product
            </Label>
         }
         InputComponent={
            <Input
               type="text"
               placeholder="Find your Product"
               id="Search"
               value={Value}
               onChange={e => setValue(e.target.value)}
               InputSize="medium"
            />
         }
      />
   );
};

export const SearchBtnHide = Template.bind({});
SearchBtnHide.args = {
   SearchBtnHide: true,
};

export const CloseBtn: ComponentStory<typeof Search> = args => {
   const [Value, setValue] = useState('');
   const throttledVal = useThrottle(Value, 1000);
   const clearText = () => {
      setValue('');
   };
   return (
      <Search
         onSubmit={(e: any) => {
            e.preventDefault();
            console.log(throttledVal);
         }}
         {...args}
         className="bg-transparent"
         clearTextFn={clearText}
         clearText={Value ? true : false}
         LabelComponent={
            <Label htmlFor="Search" hidden>
               Search Product
            </Label>
         }
         InputComponent={
            <Input
               type="text"
               placeholder="Find your Product"
               id="Search"
               value={Value}
               onChange={e => setValue(e.target.value)}
               InputSize="medium"
            />
         }
      />
   );
};
