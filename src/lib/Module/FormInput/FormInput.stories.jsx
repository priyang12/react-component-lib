import FormInput from './index';
export default {
   title: 'Module/FormInput',
   component: FormInput,
   decorators: [(story) => <div className="container">{story()}</div>],
};
export const Template = (args) => <FormInput {...args} />;

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
