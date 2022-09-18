import Button from '../../Atoms/Button/Button';
import Input from '../../Atoms/Input/Input';
import Label from '../../Atoms/Label/Label';
import { Search as ChakraSearch } from './index';
import Search from './Search';

import { ComponentMeta, ComponentStory } from '@storybook/react';

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

export const Template: ComponentStory<typeof Search> = args => (
   <ChakraSearch
      as="form"
      display="flex"
      bgColor="#20bcf0"
      onSubmit={(e: any) => {
         e.preventDefault();
         console.log('Search');
      }}
      {...args}
   >
      <Label htmlFor="Search" hidden>
         Search Product
      </Label>
      <Input
         type="text"
         placeholder="Find your Product"
         id="Search"
         InputSize="medium"
      />
      <Button variant="primary" className="search-btn">
         Search
      </Button>
   </ChakraSearch>
);

export const SearchBtnHide = Template.bind({});
SearchBtnHide.args = {
   SearchBtnHide: true,
};
