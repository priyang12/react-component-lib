import Button from './Button';

export default {
   title: 'Atoms/Button',
   component: Button,
   decorators: [
      (story) => (
         <div
            className="container"
            style={{
               height: '100px',
               width: '200px',
               padding: '20px',
               backgroundColor: '#f5f5f5',
            }}
         >
            {story()}
         </div>
      ),
   ],
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
   label: 'Button',
};

export const LongText = (args) => (
   <Button
      {...args}
      label={'long long long long Button'}
      StyleClass="ellipsis"
   />
);
