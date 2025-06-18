import Select from './Select';
import type { Meta, StoryFn } from '@storybook/react';
import { FakeCountryData } from './FakeCountryData';

export default {
   title: 'Components/Select',
   component: Select,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Select>;

export const Template: StoryFn<typeof Select> = (args) => (
   <Select
      {...args}
      options={FakeCountryData.map((item) => item.name)}
      name="Countries"
      id="Countries"
   />
);
