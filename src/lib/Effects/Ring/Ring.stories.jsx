import Ring from './index';
import Button from '../../components/Button/Button';
export default {
   title: 'Effects/Ring',
   component: Ring,
   args: {
      children: <Button>Ring it Ring</Button>,
   },
   decorators: [(story) => <div className="container">{story()}</div>],
};
export const Template = (args) => <Ring {...args} />;

export const BoderRadius = Template.bind({});
BoderRadius.args = {
   radius: '15px',
};

export const RingColor = Template.bind({});
RingColor.args = {
   radius: '10px',
   ringColor: '#333',
   ringWidth: '2px',
};

export const OuterRingColor = Template.bind({});
OuterRingColor.args = {
   radius: '20px',
   ringColor: '#333',
   ringWidth: '2px',
   OuterRingColor: 'red',
};
