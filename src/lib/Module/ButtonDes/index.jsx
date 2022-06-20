import React, { useState } from 'react';
import Button from '../../components/Button';
import './ButtonDes.scss';
function ButtonDes() {
   const [show, setshow] = useState(false);
   return (
      <div className="border">
         <Button
            style={{
               backgroundColor: '#ee37dc',
               fontSize: '1.5rem',
               padding: '.5rem 2rem',
            }}
            radius={'1.5rem'}
            onClick={() => setshow(!show)}
         >
            Click
         </Button>
         {show && (
            <p className="description">
               Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Necessitatibus voluptatem ex possimus delectus ipsum saepe quam
               soluta, aspernatur perspiciatis laudantium!
            </p>
         )}
      </div>
   );
}
export default ButtonDes;
