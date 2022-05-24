import Input from './index';
export default {
   title: 'Atoms/Input',
   component: Input,
   args: {
      type: 'text',
      placeholder: 'Search the Product',
      id: 'search',
   },
};
export const Template = (args) => <Input {...args} />;

export const Medium = Template.bind({});
Medium.args = {
   size: 'medium',
};

export const Large = Template.bind({});
Large.args = {
   size: 'large',
   required: true,
};
