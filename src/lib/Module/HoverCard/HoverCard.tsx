import { useMemo, useState } from 'react';
import { FaClock, FaEye } from 'react-icons/fa';
import HiddenCard from './HiddenCard';
import debounce from 'lodash.debounce';
import './HoverCard.scss';

function HoverCard({ PreviewTitle, ...props }: { PreviewTitle: string }) {
   const [Show, setShow] = useState(false);
   const debouncedHandleMouseEnter = useMemo(
      () =>
         debounce(() => {
            setShow(true);
         }, 1000),
      [setShow]
   );

   const handleOnMouseLeave = () => {
      setShow(false);
   };

   return (
      <article className="card" {...props}>
         <div
            className="preview_Card"
            style={{
               display: !Show ? '' : 'none',
            }}
            onMouseOver={() => {
               debouncedHandleMouseEnter();
            }}
            onMouseLeave={() => {
               debouncedHandleMouseEnter.cancel();
            }}
         >
            <div
               className="preview_Card_img"
               style={{
                  // @ts-ignore
                  '--content': PreviewTitle,
               }}
            >
               <img
                  src="https://i.ytimg.com/vi/eHXcd_DfUmg/maxresdefault.jpg"
                  alt="The Best of Ed Sheeran"
               />
            </div>
            <div className="info">
               <h2>Ed Sheena</h2>
               <div className="card__info-item">
                  <FaClock />
                  <span>Time 14:00</span>
               </div>
               <div className="card__info-item">
                  <FaEye />
                  <span>1.5 min</span>
               </div>
            </div>
         </div>
         <HiddenCard handleOnMouseLeave={handleOnMouseLeave} Show={Show} />
      </article>
   );
}
export default HoverCard;
