import {
   Title,
   Subtitle,
   Primary,
   Stories,
   Description,
   ArgTypes,
   Heading,
} from '@storybook/blocks';
import './style.css';

const CustomDocsPage = () => {
   return (
      <div className="m-5">
         <Title />
         <Subtitle>A Custom Layout for Component Docs</Subtitle>
         <Description />
         <div className="m-3 p-5">
            <Primary />
            <ArgTypes />
         </div>
         <Stories title="More Examples" />
         <Heading>Related Resources</Heading>

         <ul>
            <li>
               <a
                  href="https://github.com/myorg/mycomponent"
                  target="_blank"
                  rel="noreferrer"
               >
                  GitHub Repo
               </a>
            </li>
            <li>
               <a
                  href="https://design.mycompany.com/components"
                  target="_blank"
                  rel="noreferrer"
               >
                  Design Guidelines
               </a>
            </li>
         </ul>
      </div>
   );
};

export default CustomDocsPage;
