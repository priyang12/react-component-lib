import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEye, faPlay } from '@fortawesome/free-solid-svg-icons';

import './YTCard.scss';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import debounce from 'debounce';

function YTCard() {
   const [Show, setShow] = useState(false);
   const debouncedHandleMouseEnter = debounce(() => setShow(true), 500);

   const handlOnMouseLeave = () => {
      setShow(false);
      debouncedHandleMouseEnter.clear();
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
                  <FontAwesomeIcon icon={faClock} />
                  <span>Сегодня, 14:00</span>
               </div>
               <div className="card__info-item">
                  <FontAwesomeIcon icon={faEye} size="xs" />
                  <span>1.5 min</span>
               </div>
            </div>
         </div>
         <div
            className="Full_card"
            style={{ display: `${!Show ? 'none' : 'flex'}` }}
            onMouseLeave={handlOnMouseLeave}
         >
            <div className="card__image">
               <img
                  src="https://i.ytimg.com/vi/eHXcd_DfUmg/maxresdefault.jpg"
                  alt=""
               />
            </div>
            <div className="card__content">
               <h1 className="card__title">
                  <a href="https://www.youtube.com/watch?v=eHXcd_DfUmg">
                     The Best of Ed Sheeran
                  </a>
               </h1>
               <div className="card__info">
                  <a
                     href="https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ"
                     className="avatar"
                  >
                     {false ? (
                        <FontAwesomeIcon icon={faUserCircle} />
                     ) : (
                        <img
                           src="https://yt3.ggpht.com/ytc/AKedOLS4vwbeLCOQJpfXkGaUphLrvMhXQvfNHt8KXGAe=s176-c-k-c0x00ffffff-no-rj"
                           alt=""
                           width={50}
                           height={50}
                        />
                     )}
                  </a>
                  <div className="info">
                     <h2>Ed Sheeran</h2>
                     <div className="card__info-item">
                        <FontAwesomeIcon icon={faClock} />
                        <span>Сегодня, 14:00</span>
                     </div>
                     <div className="card__info-item">
                        <FontAwesomeIcon icon={faEye} size="xs" />
                        <span>1.5 min</span>
                     </div>
                  </div>
               </div>
               <div className="buttons">
                  <button className="button">
                     <FontAwesomeIcon icon={faPlay} />
                     <span>Add to Playlist</span>
                  </button>
                  <button>
                     <FontAwesomeIcon icon={faClock} />
                     <span>watch Later</span>
                  </button>
               </div>
            </div>
         </div>
      </article>
   );
}
export default YTCard;
