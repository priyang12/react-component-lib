import ButtonDes from './index';
export default {
   title: 'Module/ButtonDes',
   component: ButtonDes,
   decorators: [
      (story) => (
         <div
            className="container"
            style={{
               backgroundColor: '#333',
            }}
         >
            {story()}
         </div>
      ),
   ],
};
export const Template = (args) => <ButtonDes {...args} />;
