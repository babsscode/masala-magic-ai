import { FoodAPIType } from '@/shared/types';
import { motion } from 'framer-motion';
import {PaperAirplaneIcon} from "@heroicons/react/24/solid";
import FoodCard from '@/scenes/home/food-card';
import { useEffect, useState, FormEvent, ChangeEvent } from 'react';


const Home = () => { 
    const [foodApiData, setFoodApiData] = useState<FoodAPIType | null>(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [loading2, setLoading2] = useState(false); // Loading state

    useEffect(() => {
        const apiUrl = 'https://babsscode.pythonanywhere.com/api';

        fetch(apiUrl)
        .then(res => res.json())
        .then((response) => {
            setFoodApiData(response);
            setLoading(false); // Set loading to false after data is fetched
        })
        .catch(error => console.error('API Fetch Error:', error));
    }, []);
  

  useEffect(() => {
    // You can perform any additional logic when apiData changes
  }, [foodApiData]);

  // useState for handling the input value (phrase) fun and easy snacks
  const [inputPhrase, setInputPhrase] = useState('fun and easy snacks');
  const [inputOffSet, setInputOffSet] = useState(10);  

  //---------------------------------------
 // Function to handle form submission
 const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = {
        phrase: inputPhrase,
        offset: inputOffSet,
    };

    setLoading(true);

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

        setFoodApiData(result);
    } catch (error) {
        console.error('Error:', error);
    }
    finally {
        setLoading(false); 
        console.log("done")
        setLoading2(false);
    }
};

  // Function to handle input value change
const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputPhrase(event.target.value);
    setInputOffSet(10);
};

const handleOffsetChange = () => {
    setLoading2(true);
    console.log("loading2")
    setInputOffSet((prevOffset) => prevOffset + 10);
}
const handleRandChange = () => {
    setInputPhrase('random')
}
{/*
const handleRandChangeTwo = async (event: FormEvent) => {
    event.preventDefault();

    try {
        const apiUrl = 'https://babsscode.pythonanywhere.com/random';
  
        const response = await fetch(apiUrl);
  
        if (!response.ok) {
          throw new Error('Failed to fetch data from the backend');
        }
  
        const responseData = await response.json();
        setFoodApiData(responseData);
      } catch (error) {
        console.error('API Fetch Error:', error);
      }
};
*/}

  return <section
       id="home"
       className="gap-16 py-10 md:h-[800px] w-full md:pb-0 text-black"
   >
       {/* main headers and search bar*/}
       <motion.div
       className='mx-auto w-5/6 items-center justify-center  md:h-5/6'
       >
           <div className='mt-6 md:mb-0 md:basis-3/8'>
               {/* main heading Struggling with Meal Ideas? Just Ask Amma.*/}
               <p className='text-[2.5rem] md:text-[4rem] text-center leading-[4rem] md:leading-[6rem]'>Masala Magic AI</p>
               <br/>
               {/* 2nd heading Amma's Ruchi, AI's Insight.*/}
               <p className='mt-2 md:mt-4 text-xl md:text-2xl text-center '>
                Struggling with meal ideas? <br/>Search thourgh thousands of delicious Indian recipes using AI!
               </p>
               <br/>
               <br/>
               <form className="" onSubmit={handleSubmit}>
                   {/* search bar */}
                   <div className='flex md:space-x-4 space-x-2 justify-center'>
                    <div className='flex-initial'>
                    <input 
                        id="inputFoodPrompt" 
                        className='placeholder-gray-500 rounded-2xl border-2 text-center border-black focus:border-blue-400 focus:ring-0 h-[3.10rem] w-[15rem] md:w-[45rem]' 
                        placeholder="fun and easy snacks"
                        //value={inputPhrase}
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
                <form onSubmit={handleSubmit}>
               <div className="flex md:space-x-4 space-x-2 justify-center">
               <button
               type='submit' 
               className='rounded-2xl border-[2px] border-black text-white text-md bg-myprimary-200 px-[0.8rem] py-[0.8rem] bg-black hover:bg-slate-400'
               onClick={handleRandChange}
               >
                try something new!
               </button>
               <br/>
               <br/>
               </div>
               </form>
               <br/>
               {/* 
               card animation
               <motion.div className="animatable w-[20rem] h-[15rem] rounded-2xl border-2 text-center border-black bg-white"
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}>
                   <button className=''>
                       hello
                   </button>
               </motion.div>
               */}
               {/* Conditionally show loading spinner */}
                {loading && (
                <div className="mb-6 flex justify-center items-center space-x-2">
                <div className="w-6 h-6 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                <span>Searching...</span>
                </div>
                )}
               {/* other cards */}
               <div className='flex flex-row flex-wrap justify-center gap-[3rem]'>
               {foodApiData &&
                    Object.entries(foodApiData)
                    .sort(([, dataA], [, dataB]) => dataA.id - dataB.id)
                    .map(([name, data]) => (
                    <FoodCard  key={name} foodAPIwKey={{ name, data }} />
                ))}
               </div>
               <br/>
               <br/>
                <form onSubmit={handleSubmit}>
               <div className="flex md:space-x-4 space-x-2 justify-center">
                {/* Conditionally show loading spinner */}
                {loading2 && (
                <div className="mb-6 flex justify-center items-center space-x-2">
                <div className="w-6 h-6 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>                <br/>
                <br/>
                </div>
                )}
                <div className='flex'>
                    <button
                        type='submit' 
                        className='rounded-2xl border-[2px] border-black text-white text-md bg-myprimary-200 px-[0.8rem] py-[0.8rem] bg-black hover:bg-slate-400'
                        onClick={handleOffsetChange}
                        >
                        load more
                    </button>
                </div>
               
               </div>
               </form>
               <br/>
               <br/>
           </div>
       </motion.div>
   </section>;
};


export default Home
