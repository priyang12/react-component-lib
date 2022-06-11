import FormInput from './index';
import Label from '../../components/Label';
import Input from '../../components/Input';

export default {
   title: 'Module/FormInput',
   component: FormInput,
   decorators: [(story) => <div className="container">{story()}</div>],
};
export const Template = (args) => (
   <FormInput {...args}>
      <Label htmlFor="Search" size="medium">
         Search
      </Label>
      <Input type="text" id="Search" size="large" />
   </FormInput>
);

export const BorderInput = Template.bind({});
BorderInput.args = {
   style: {
      border: '2px solid #333',
      padding: '1em',
   },
};

export const OverlayInput = Template.bind({});

OverlayInput.args = {
   overlay: true,
};
