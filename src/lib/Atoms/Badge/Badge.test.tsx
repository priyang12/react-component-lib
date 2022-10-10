import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as BadgeStories from './Badge.stories';
const { Template, Variant, AnchorOrigin } = composeStories(BadgeStories);

it('should render without crashing', () => {
   render(<Template />);
});

it('Render variant', () => {
   render(<Variant variant="primary" />);
   expect(document.querySelector('.badge')).toHaveClass('primary');
});

it('Render AnchorOrigin', () => {
   render(
      <AnchorOrigin
         anchorOriginVertical="bottom"
         anchorOriginHorizontal="left"
      />
   );
   expect(document.querySelector('.badge')).toHaveClass(
      'badge-position-bottom-left'
   );
});
