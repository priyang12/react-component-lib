import { Default as Button } from '../../components/Button/Button.stories';
import GradientHover from './GradientHover';

export default {
   title: 'Effects/GradientBorder',
   component: GradientHover,
   args: {
      BorderSize: '0.2em',
      children: (
         <Button
            style={{
               background: 'transparent',
            }}
         />
      ),
   },
   decorators: [(story) => <div className="container">{story()}</div>],
};

const Template = (args) => <GradientHover {...args} />;

export const Default = Template.bind({});

export const BorderSize = Template.bind({});

BorderSize.args = {
   BorderSize: '0.5em',
};

export const BorderAnimation = Template.bind({});
BorderAnimation.args = {
   animation: ' grd 0.2s ease-in-out infinite',
};

export const Faster = BorderAnimation.bind({});

Faster.args = {
   animation: 'grd 0.1s ease-in-out infinite',
};
