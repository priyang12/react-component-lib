import Select from './Select';
import type { Meta, StoryFn } from '@storybook/react';
import { FakeCountryData } from './FakeCountryData';
import Options from './Options';

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
      <Select
         {...args}
         name="Countries"
         id="Countries"
         inputSize="medium"
         options={FakeCountryData.map((item) => {
            return {
               label: item.name,
               value: item.code,
            };
         })}
         renderOptions={({
            selectedOption,
            filteredOptions,
            focusedIndex,
            selectValue,
            toggle,
            setFocusedIndex,
         }) => (
            <Options
               style={{
                  backgroundColor: 'red',
               }}
               selectedOption={selectedOption}
               filteredOptions={filteredOptions}
               focusedIndex={focusedIndex}
               selectValue={selectValue}
               toggle={toggle}
               setFocusedIndex={setFocusedIndex}
            />
         )}
      />
   </>
);

export const SearchingLabel = Template.bind({});
SearchingLabel.args = {
   initialValue: '',
   renderLabel: ({ searching, selectedValue }) => {
      return searching ? (
         <label htmlFor="Countries">Searching</label>
      ) : (
         <label htmlFor="Countries">Select Country : {selectedValue}</label>
      );
   },
};
