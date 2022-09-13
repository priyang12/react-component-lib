import { withChakraProps } from '../../Utils/withChakraProps';
import {
   Calendar,
   CalendarDays,
   CalendarFooter,
   CalendarMonths,
   CalendarTitle,
} from './Calendar';

const ChakraCalendar = withChakraProps(Calendar);
const ChakraTitle = withChakraProps(CalendarTitle);
const ChakraMonths = withChakraProps(CalendarMonths);
const ChakraDays = withChakraProps(CalendarDays);
const ChakraFooter = withChakraProps(CalendarFooter);

export {
   ChakraCalendar as Calendar,
   ChakraTitle as Title,
   ChakraMonths as Months,
   ChakraDays as Days,
   ChakraFooter as Footer,
};
