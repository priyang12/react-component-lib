import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEye, faPlay } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import './YTCard.scss';

function YTCard() {
   return (
      <article className="card">
         <div className="card__image">
            <img
               src="https://i.ytimg.com/vi/eHXcd_DfUmg/maxresdefault.jpg"
               alt=""
            />
         </div>
         <div className="card__content">
            <h3 className="card__title">
               <a href="https://www.youtube.com/watch?v=eHXcd_DfUmg">
                  The Best of Ed Sheeran
               </a>
            </h3>
            <div className="card__info">
               <div className="card__info-item">
                  <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                  <img
                     src="https://yt3.ggpht.com/ytc/AKedOLS4vwbeLCOQJpfXkGaUphLrvMhXQvfNHt8KXGAe=s176-c-k-c0x00ffffff-no-rj"
                     alt=""
                     width={50}
                     height={50}
                  />
                  <a href="https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ">
                     Ed Sheeran
                  </a>
               </div>
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
      </article>
   );
}
export default YTCard;
