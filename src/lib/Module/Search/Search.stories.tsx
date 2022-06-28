import Button from '../../components/Button/Button';
import Search from './index';
import Input from '../../components/Input';
import Label from '../../components/Label';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
   title: 'Module/Search',
   component: Search,
   decorators: [(story) => <div className="container">{story()}</div>],
} as ComponentMeta<typeof Search>;

export const Template: ComponentStory<typeof Search> = (args) => (
   <Search
      as="form"
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
         size="medium"
      />
      <Button variant="primary" className="search-btn">
         Search
      </Button>
   </Search>
);

export const SearchBtnHide = Template.bind({});
SearchBtnHide.args = {
   SearchBtnHide: true,
};
