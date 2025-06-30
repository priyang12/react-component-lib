import * as React from 'react';
import Accordion, { AccordionContext } from './Accordion';
import { fireEvent, render, screen } from '@testing-library/react';

const DummyChild = ({ index }: { index: number }) => {
   const { handleItemClick, indexes } = React.useContext(AccordionContext);
   return (
      <div data-testid={`item-${index}`}>
         <button onClick={() => handleItemClick(index)}>Toggle {index}</button>
         {indexes.includes(index) && <div>Content {index}</div>}
      </div>
   );
};

describe('Accordion Component', () => {
   it('renders children', () => {
      render(
         <Accordion OnlyOne={false}>
            <div>Test Content</div>
         </Accordion>
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
   });

   it('allows multiple items to open when OnlyOne is false', () => {
      render(
         <Accordion OnlyOne={false}>
            <DummyChild index={0} />
            <DummyChild index={1} />
         </Accordion>
      );

      fireEvent.click(screen.getByText('Toggle 0'));
      fireEvent.click(screen.getByText('Toggle 1'));

      expect(screen.getByText('Content 0')).toBeInTheDocument();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
   });

   it('allows only one item to be open when OnlyOne is true', () => {
      render(
         <Accordion OnlyOne={true}>
            <DummyChild index={0} />
            <DummyChild index={1} />
         </Accordion>
      );

      fireEvent.click(screen.getByText('Toggle 0'));
      expect(screen.getByText('Content 0')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Toggle 1'));
      expect(screen.queryByText('Content 0')).not.toBeInTheDocument();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
   });

   it('respects initialOpenIndexes prop', () => {
      render(
         <Accordion OnlyOne={false} initialOpenIndexes={[1]}>
            <DummyChild index={0} />
            <DummyChild index={1} />
         </Accordion>
      );

      expect(screen.queryByText('Content 0')).not.toBeInTheDocument();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
   });
});
