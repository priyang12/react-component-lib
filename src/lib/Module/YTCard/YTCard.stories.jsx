import YTCard from './index';
export default {
   title: 'Module/YTCard',
   component: YTCard,
   decorators: [
      (story) => (
         <div
            className="container"
            style={{
               width: '100%',
               maxWidth: '1200px',
               margin: '0 auto',
               height: '100vh',
            }}
         >
            {story()}
         </div>
      ),
   ],
};
export const Template = (args) => <YTCard {...args} />;
