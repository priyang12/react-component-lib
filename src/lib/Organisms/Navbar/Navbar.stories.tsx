import Navbar from './Navbar';
import { Template as SearchStories } from '../../Module/Search/Search.stories';
import { FaAdversal } from 'react-icons/fa';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Rounded as MenuComponent } from '../../Module/MenuList/MenuList.stories';
import MenuItem from '../../Atoms/MenuItem';

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
      LastComponent={
         <MenuComponent
            Joined={true}
            Grouped={false}
            MenuItem={<MenuItem Element={'li'} className="p-0" />}
            items={[]}
         />
      }
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

export const SkipNav = Logo.bind({});
SkipNav.args = {
   SkipNav: true,
};

export const CustomSkipNav = SkipNav.bind({});
CustomSkipNav.args = {
   SkipNav: true,
   SkipNavComponent: <div>Skip Nav</div>,
};
