import { CardBottom, CardImage, CardWrapper, HiddenCard } from './HoverCard';
import { withChakraProps } from '../../Utils/withChakraProps';

const ChakraCardWrapper = withChakraProps(CardWrapper);
const ChakraImage = withChakraProps(CardImage);
const ChakraHiddenCard = withChakraProps(HiddenCard);
const ChakraCardBottom = withChakraProps(CardBottom);

export {
   ChakraCardWrapper as CardWrapper,
   ChakraImage as CardImage,
   ChakraHiddenCard as HiddenCard,
   ChakraCardBottom as CardBottom,
};
