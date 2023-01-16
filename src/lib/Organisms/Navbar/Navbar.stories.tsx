import Navbar from './Navbar';
import { Template as SearchStories } from '../../Module/Search/Search.stories';
import { FaAdversal } from 'react-icons/fa';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
   title: 'Organisms/Navbar',
   component: Navbar,
   decorators: [
      story => (
         <div
            className="container"
            style={{
               display: 'block',
            }}
         >
            {story()}
         </div>
      ),
   ],
} as ComponentMeta<typeof Navbar>;

export const Template: ComponentStory<typeof Navbar> = args => (
   <Navbar
      {...args}
      LogoComponent={<div>Navbar Title</div>}
      MiddleComponent={
         <SearchStories LabelComponent={undefined} InputComponent={undefined} />
      }
      LastComponent={<div></div>}
   />
);

export const Logo: ComponentStory<typeof Navbar> = args => (
   <Navbar
      {...args}
      LogoComponent={
         <div className="cursor-pointer">
            <FaAdversal />
         </div>
      }
      MiddleComponent={
         <SearchStories LabelComponent={undefined} InputComponent={undefined} />
      }
      LastComponent={<div></div>}
   />
);
