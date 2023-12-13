import { FoodAPIType } from '@/shared/types';
import { motion } from 'framer-motion';
import {PaperAirplaneIcon} from "@heroicons/react/24/solid";
import FoodCard from '@/scenes/home/food-card';
import { useEffect, useState, FormEvent, ChangeEvent } from 'react';


const Home = () => { 
    const [foodApiData, setFoodApiData] = useState<FoodAPIType | null>(null);

  useEffect(() => {
    const apiUrl = 'https://babsscode.pythonanywhere.com/api';

    fetch(apiUrl)
      .then(res => res.json())
      .then((response) => setFoodApiData(response))
      .catch(error => console.error('API Fetch Error:', error));
  }, []);
  useEffect(() => {
    // You can perform any additional logic when apiData changes
    console.log('API Data updated:', foodApiData);
  }, [foodApiData]);

  // useState for handling the input value (phrase)
  const [inputPhrase, setInputPhrase] = useState('');

  //---------------------------------------
 // Function to handle form submission
 const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = {
        phrase: inputPhrase,
    };

    try {
        const response = await fetch('https://babsscode.pythonanywhere.com/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to send data to the backend');
        }

        const result = await response.json();
        console.log(result); // Log the response from the backend

        setFoodApiData(result);
    } catch (error) {
        console.error('Error:', error);
    }
};

  // Function to handle input value change
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputPhrase(event.target.value);
};


  return <section
       id="home"
       className="gap-16 bg-mysecondary-300 py-10 md:h-[800px] w-full md:pb-0"
   >
       {/* main headers and search bar*/}
       <motion.div
       className='mx-auto w-5/6 items-center justify-center md:h-5/6'
       >
           <div className='mt-6 md:mb-0 md:basis-3/8'>
               {/* main heading */}
               <p className='text-[2.5rem] md:text-[5.5rem] text-center leading-[4rem] md:leading-[6rem]'>don't know what to make for your next meal?</p>
               <br/>
               {/* 2nd heading */}
               <p className='mt-4 text-2xl md:text-4xl text-center text-myprimary-100'>
                   ask foody, your personal ai chef
               </p>
               <br/>
               <br/>
               <form className="" onSubmit={handleSubmit}>
                   {/* search bar */}
                   <div className='flex md:space-x-4 space-x-2 justify-center'>
                    <div className='flex-initial'>
                    <input 
                        id="inputFoodPrompt" 
                        className='rounded-2xl border-2 text-center border-black focus:border-blue-400 focus:ring-0 h-[3.10rem] w-[15rem] md:w-[45rem]' 
                        placeholder="i'm craving... "
                        value={inputPhrase}
                        onChange={handleInputChange}/>
                    </div>
                   {/* send button */}
                    <div className='flex-zero'>
                    <button
                    type='submit' 
                    className='rounded-2xl border-[2px] border-black text-white text-lg bg-myprimary-200 px-[0.8rem] py-[0.8rem] bg-black hover:bg-slate-400'>
                       <PaperAirplaneIcon className='h-5 w-5'/>
                    </button>
                    </div>
                   </div>
                </form>
               <br/>
               <br/>
               {/* card animation
               <motion.div className="animatable w-[20rem] h-[15rem] rounded-2xl border-2 text-center border-black bg-white"
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}>
                   <button className=''>
                       hello
                   </button>
               </motion.div>
               */}
               {/* other cards */}
               <div className='flex flex-row flex-wrap justify-center gap-[3rem]'>
               {foodApiData &&
                    Object.entries(foodApiData).map(([name, data]) => (
                    <FoodCard foodAPIwKey={{ name, data }} />
                ))}
               </div>
               <br/>
               <br/>
           </div>
       </motion.div>
   </section>;
};


export default Home
