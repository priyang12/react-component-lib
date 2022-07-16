import { useState } from 'react';
import Fullcard from './Fullcard';
import './YTCard.scss';

function YTCard() {
   const [Show, setShow] = useState(false);

   // Todo: Add a timeout to hide the card
   // Todo: Preview the video

   const debouncedHandleMouseEnter = () => {
      setShow(true);
   };

   const handlOnMouseLeave = () => {
      setShow(false);
   };

   return (
      <article className="card">
         <div
            className="preview_Card"
            style={{
               display: !Show ? 'block' : 'none',
            }}
            onMouseOver={debouncedHandleMouseEnter}
         >
            <div className="preview_Card_img">
               <img
                  src="https://i.ytimg.com/vi/eHXcd_DfUmg/maxresdefault.jpg"
                  alt="asdsad"
               />
            </div>
            <div className="info">
               <h2>Ed Sheeran</h2>
               <div className="card__info-item">
                  {/* <FontAwesomeIcon icon={faClock} /> */}
                  <span>Сегодня, 14:00</span>
               </div>
               <div className="card__info-item">
                  {/* <FontAwesomeIcon icon={faEye} size="xs" /> */}
                  <span>1.5 min</span>
               </div>
            </div>
         </div>
         <Fullcard
            handlOnMouseLeave={handlOnMouseLeave}
            Show={Show}
            url="https://i.ytimg.com/vi/eHXcd_DfUmg/maxresdefault.jpg"
         />
      </article>
   );
}
export default YTCard;
