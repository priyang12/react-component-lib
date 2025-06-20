import Select from './Select';
import type { Meta, StoryFn } from '@storybook/react';
import { FakeCountryData } from './FakeCountryData';

export default {
   title: 'Components/Select',
   component: Select,
   args: {
      initialValue: 'select Value',
   },
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Select>;

export const Template: StoryFn<typeof Select> = (args) => (
   <>
      <label htmlFor="Countries">Countries</label>
      <Select
         {...args}
         options={FakeCountryData.map((item) => {
            return {
               label: item.name,
               value: item.code,
            };
         })}
         name="Countries"
         id="Countries"
      />
   </>
);
