import Label from './index';
export default {
   title: 'Atoms/Label',
   component: Label,
   args: {
      children: 'Search',
      htmlFor: 'search',
      id: 'search',
   },
   decorators: [(story) => <div className="container">{story()}</div>],
};
export const Template = (args) => <Label {...args} />;

export const hiddenLabel = Template.bind({});
hiddenLabel.args = {
   hidden: true,
};
