import { usePopContext } from './PopContainer';
import { FiTriangle } from 'react-icons/fi'; // or any triangle-like icon

const PopArrow = () => {
   const { middlewareData, arrowRef, placement } = usePopContext();
   const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
   }[placement.split('-')[0]] as string;

   console.log(staticSide);

   return (
      <div
         className="pop-arrow"
         ref={arrowRef}
         style={{
            position: 'absolute',
            top: middlewareData.arrow?.y,
            left: middlewareData.arrow?.x,
            [staticSide]: '-8px',
         }}
      >
         <FiTriangle fill="black" className={`arrow-icon ${staticSide}`} />
      </div>
   );
};

export default PopArrow;
