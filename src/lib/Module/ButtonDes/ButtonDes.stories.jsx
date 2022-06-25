import ButtonDes from './index';
export default {
   title: 'Module/ButtonDes',
   component: ButtonDes,
   args: {
      children: (
         <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consectetur aliquid repellendus magni aliquam consequatur, odit
            placeat quibusdam cum, amet obcaecati, omnis itaque possimus
            necessitatibus nam inventore? Itaque hic ducimus soluta.
         </p>
      ),
   },
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

export const ContainerWidth = Template.bind();
ContainerWidth.args = {
   width: '50%',
};
