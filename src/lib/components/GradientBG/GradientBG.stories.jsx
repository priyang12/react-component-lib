import GradientBG from './index';
import Button from '../Button/Button';

export default {
   title: 'Atoms/GradientBG',
   component: GradientBG,
   args: {
      children: 'Background',
      Element: 'li',
   },
   decorators: [
      (story) => (
         <div
            className="container"
            style={{
               height: '100px',
               width: '300px',
            }}
         >
            {story()}
         </div>
      ),
   ],
};
export const Template = (args) => <GradientBG {...args} />;

export const Focused = Template.bind({});
Focused.args = {
   Element: 'li',
   focused: true,
};

export const Animate = Template.bind({});
Animate.args = {
   Animate: 'animation',
};
