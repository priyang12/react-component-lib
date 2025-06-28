import { render, screen, fireEvent } from '@testing-library/react';
import DragNDrop from './DragNDrop';
import { vi } from 'vitest';

vi.mock('./DefaultContainer', () => ({
   __esModule: true,
   default: ({ onFileSelect }: any) => (
      <div
         data-testid="default-container"
         onClick={() => onFileSelect?.(new File(['test'], 'file.txt'))}
      >
         Default Container
      </div>
   ),
}));

describe('DragNDrop', () => {
   it('renders custom drop container when provided', () => {
      render(
         <DragNDrop
            renderDropContainer={({ isDragging }) => (
               <div data-testid="custom">
                  {isDragging ? 'Dragging...' : 'Drop Here'}
               </div>
            )}
         />
      );
      expect(screen.getByTestId('custom')).toHaveTextContent('Drop Here');
   });

   it('renders default container when no render prop is provided', () => {
      render(<DragNDrop />);
      expect(screen.getByTestId('default-container')).toBeInTheDocument();
   });

   it('calls onDropFile with dropped file', () => {
      const handleDrop = vi.fn();
      render(<DragNDrop onDropFile={handleDrop} />);
      const dropZone = screen.getByRole('button'); // fallback div

      const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
      const dataTransfer = {
         files: [file],
         types: ['Files'],
      };

      fireEvent.dragOver(dropZone);
      fireEvent.drop(dropZone, { dataTransfer });

      expect(handleDrop).toHaveBeenCalledWith(file);
   });

   it('toggles dragging class on drag events', () => {
      render(<DragNDrop />);
      const dropZone = screen.getByRole('button');

      fireEvent.dragOver(dropZone);
      expect(dropZone.className).toContain('dragging');

      fireEvent.dragLeave(dropZone);
      expect(dropZone.className).not.toContain('dragging');
   });

   it('updates render prop output when dragging changes', () => {
      render(
         <DragNDrop
            renderDropContainer={({ isDragging }) => (
               <div data-testid="custom">
                  {isDragging ? 'Dragging!' : 'Idle'}
               </div>
            )}
         />
      );
      const dropZone = screen.getByRole('button');
      expect(screen.getByTestId('custom')).toHaveTextContent('Idle');

      fireEvent.dragOver(dropZone);
      expect(screen.getByTestId('custom')).toHaveTextContent('Dragging!');

      fireEvent.dragLeave(dropZone);
      expect(screen.getByTestId('custom')).toHaveTextContent('Idle');
   });
});
