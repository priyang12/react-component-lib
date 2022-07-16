const Fullcard = ({ handlOnMouseLeave, Show }: any) => {
   return (
      <div
         className="Full_card"
         style={{ display: `${!Show ? 'none' : 'flex'}` }}
         onMouseLeave={handlOnMouseLeave}
      >
         {/* <div className="card__image">
                <img src={url} alt="name" />
            </div> */}
         <div className="card__content">
            <h1 className="card__title">
               <a href="https://www.youtube.com/watch?v=eHXcd_DfUmg">
                  The Best of Ed Sheeran
               </a>
            </h1>

            <div className="buttons">
               <button className="button">
                  {/* <FontAwesomeIcon icon={faPlay} /> */}
                  <span>Add to Playlist</span>
               </button>
               <button>
                  {/* <FontAwesomeIcon icon={faClock} /> */}
                  <span>watch Later</span>
               </button>
            </div>
         </div>
      </div>
   );
};

export default Fullcard;
