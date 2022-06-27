import { LongText as Button } from '../Button/Button.stories';
import VercelButton from './index';

export default {
   title: 'Atoms/VercelButton',
   component: VercelButton,
   args: {
      children: (
         <Button
            style={{
               background: 'black',
               width: 'calc(100% + 10px)',
               height: 'calc(100% + 10px)',
               transition: 'all 0.5s ease',
            }}
         />
      ),
      AnimationCss: 'none',
   },
   decorators: [
      (story) => (
         <div
            className="container"
            style={{
               height: '100px',
               padding: '20px',
               backgroundColor: '#333',
            }}
         >
            {story()}
         </div>
      ),
   ],
};

const Template = (args) => <VercelButton {...args} />;

export const Default = Template.bind({});

export const VercelAnimation = Template.bind({});

VercelAnimation.args = {
   AnimationCss: 'vercel-animation',
};

export const Border = Template.bind({});

Border.args = {
   children: (
      <Button
         style={{
            background: 'black',
            width: 'calc(100% - 12px)',
            height: 'calc(100% - 10px)',
         }}
      />
   ),
};
export const BorderHover = Template.bind({});

BorderHover.args = {
   AnimationCss: 'border-animation',
};
