import { chakra } from '@chakra-ui/system';

export function withChakraProps<T>(WrappedComponent: React.ComponentType<T>) {
   return chakra(WrappedComponent);
}
