import Select from './Select';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FakeCountryData } from './FakeCountryData';

export default {
   title: 'Atoms/Select',
   component: Select,
   decorators: [story => <div className="container">{story()}</div>],
} as ComponentMeta<typeof Select>;

export const Template: ComponentStory<typeof Select> = args => (
   <Select
      {...args}
      options={FakeCountryData.map(item => item.name)}
      name="Countries"
      id="Countries"
   />
);
