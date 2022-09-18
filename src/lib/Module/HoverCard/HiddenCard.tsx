import { Button } from '../../Atoms';
import { ButtonGroup } from '../ButtonGroup';

const HiddenCard = ({
   handleOnMouseLeave,
   Show,
}: {
   handleOnMouseLeave: () => void;
   Show: boolean;
}) => {
   // &:hover {
   //    transform: scale(1);
   //    opacity: 1;
   // }
   return (
      <div
         className="hidden_Card"
         style={{
            display: `${!Show ? 'none' : 'flex'}`,
         }}
         onMouseLeave={handleOnMouseLeave}
      >
         <div className="card__image"></div>
         <div className="card__content">
            <h1 className="title">
               <a href="https://www.youtube.com/watch?v=eHXcd_DfUmg">
                  The Best of Ed Sheeran
               </a>
            </h1>

            <ButtonGroup flexDir="column">
               <Button className="btn btn--primary">Watch Now</Button>
               <Button className="btn btn--secondary">
                  Add to Watch Later
               </Button>
            </ButtonGroup>
         </div>
      </div>
   );
};

export default HiddenCard;
