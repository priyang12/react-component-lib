import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as TextEffectStories from './TextEffect.stories';

const { Template } = composeStories(TextEffectStories);

it('render Input', () => {
   render(<Template />);
});
