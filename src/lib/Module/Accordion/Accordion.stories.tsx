import Accordion from './Accordion';
import type { Meta, StoryFn } from '@storybook/react';
import { AccordionButton, AccordionContent } from '../../Atoms';
import { AccordionIcon } from '../../Atoms/AccordionItems/AccordionItems';

export default {
   title: 'Module/Accordion',
   component: Accordion,
   decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof Accordion>;

const items = [
   {
      id: 1,
      title: 'item one',
      content:
         "Horses can sleep both lying down and standing up. Domestic horses have a lifespan of around 25 years. A 19th century horse named 'Old Billy' is said to have lived 62 years.",
   },
   {
      id: 2,
      title: 'item two',
      content:
         'Rhino skin maybe thick but it can be quite sensitive to sunburns and insect bites which is why they like wallow so much – when the mud dries it acts as protection from the sunburns and insects.',
   },
   {
      id: 3,
      title: 'item three',
      content:
         'If you’re looking to hunt a unicorn, but don’t know where to begin, try Lake Superior State University in Sault Ste. Marie, Michigan. Since 1971, the university has issued permits to unicorn questers.',
   },
];

export const Template: StoryFn<typeof Accordion> = (args) => (
   <Accordion {...args}>
      {items.map((item, index) => (
         <>
            <AccordionButton
               aria-controls={`${item.id}-content`}
               aria-labelledby={`${item.id}-title`}
               index={index}
            >
               <h1 id={`${item.id}-title`}>{item.title}</h1>
               <AccordionIcon index={index} OpenIcon={'👈'} CloseIcon={'👇'} />
            </AccordionButton>
            <AccordionContent index={index} id={`${item.id}-content`}>
               <div>{item.content}</div>
            </AccordionContent>
         </>
      ))}
   </Accordion>
);

export const OpenOne = Template.bind({});

OpenOne.args = {
   OnlyOne: true,
};
