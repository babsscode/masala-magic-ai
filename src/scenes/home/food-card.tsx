import { useState } from 'react';
import { motion } from "framer-motion";
import { FoodAPIwKey } from '@/shared/types';

type Props = {
  foodAPIwKey: FoodAPIwKey;
}

function FoodCard({ foodAPIwKey }: Props) {
  const [isFlipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!isFlipped);
  };

  return (
    <div className= "max-w-[25rem] break-words" >
      <motion.div
              className="animate rounded-2xl border-2 text-center border-black bg-white w-fit h-fit p-3"
              key={foodAPIwKey.data.id}
              layoutId={(foodAPIwKey.data.id).toString()}
              onClick={handleClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
        >
          <motion.h2 className='break-words'>{foodAPIwKey.name}</motion.h2>
          <br/>

          {/* front of card */}
          {!isFlipped && (
              <motion.div className="flex flex-wrap justify-center">
                <img 
                className='max-w-full h-auto max-h-[15rem]'
                src={foodAPIwKey.data.imageUrl}
                />
              </motion.div>
            )}
            {/* back of card */}
          {isFlipped && (
              <motion.div className='max-w-[25rem] break-words'>
                <motion.h4>{foodAPIwKey.data.cuisine}</motion.h4>
                <br/>
                <motion.h5>{foodAPIwKey.data.course}</motion.h5>
                <br/>
                <motion.h5>{foodAPIwKey.data.diet}</motion.h5>
                <br/>
                <motion.h5>{foodAPIwKey.data.ingredients}</motion.h5>
                <br/>
                <a className='' href={foodAPIwKey.data.websiteUrl} target="_blank">
                  <button className='border-2 border-black rounded-2xl px-12 py-2 text-white bg-black hover:text-black hover:bg-white' type="button">
                    find recipe
                  </button>
                </a>
              </motion.div>
            )}
        </motion.div>

    </div>
  )
}

export default FoodCard