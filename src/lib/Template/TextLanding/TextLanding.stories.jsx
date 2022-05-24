import TextLanding from './index';
export default {
   title: 'Template/TextLanding',
   component: TextLanding,
   decorators: [(story) => <div className="container">{story()}</div>],
};
export const Template = (args) => <TextLanding {...args} />;
