import { FoodAPIType } from '@/shared/types';
import { motion } from 'framer-motion';
import {PaperAirplaneIcon, SparklesIcon, ArrowPathIcon} from "@heroicons/react/24/solid";
import FoodCard from '@/scenes/home/food-card';
import { useEffect, useState, FormEvent, ChangeEvent } from 'react';

const Home = () => { 
    const [foodApiData, setFoodApiData] = useState<FoodAPIType | null>(null);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);

    useEffect(() => {
        const apiUrl = 'https://babsscode.pythonanywhere.com/api';

        fetch(apiUrl)
        .then(res => res.json())
        .then((response) => {
            setFoodApiData(response);
            setLoading(false);
        })
        .catch(error => console.error('API Fetch Error:', error));
    }, []);
  
    useEffect(() => {
        // Additional logic when apiData changes
    }, [foodApiData]);

    const [inputPhrase, setInputPhrase] = useState('fun and easy snacks');
    const [inputOffSet, setInputOffSet] = useState(10);  

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
        } finally {
            setLoading(false); 
            setLoading2(false);
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputPhrase(event.target.value);
        setInputOffSet(10);
    };

    const handleOffsetChange = () => {
        setLoading2(true);
        setInputOffSet((prevOffset) => prevOffset + 10);
    }

    const handleRandChange = () => {
        setInputPhrase('random')
    }

    return (
        <section
            id="home"
            className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 py-10 px-4"
        >
            {/* Main container with improved spacing */}
            <motion.div
                className='mx-auto max-w-7xl'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Header section with better styling */}
                <div className='text-center mb-12'>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className='text-4xl md:text-7xl mb-10 font-bold bg-gradient-to-r from-orange-600 via-red-500 to-yellow-500 bg-clip-text text-transparent leading-tight'>
                            Masala Magic AI
                        </h1>
                        <p className='text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed'>
                            Struggling with meal ideas? <br/>
                            <span className='font-semibold text-orange-600'>Search through thousands of delicious Indian recipes using AI!</span>
                        </p>
                    </motion.div>

                    {/* Enhanced search form */}
                    <motion.form 
                        className="mt-12 mb-8" 
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto'>
                            <div className='relative flex-1 w-full sm:w-auto'>
                                <input 
                                    id="inputFoodPrompt" 
                                    className='w-full px-6 py-4 text-lg rounded-full border-2 border-orange-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all duration-300 shadow-lg bg-white placeholder-gray-400' 
                                    placeholder="fun and easy snacks"
                                    onChange={handleInputChange}
                                />
                                <SparklesIcon className='absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-orange-400' />
                            </div>
                            <motion.button
                                type='submit' 
                                className='px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <PaperAirplaneIcon className='h-5 w-5'/>
                                Search
                            </motion.button>
                        </div>
                    </motion.form>

                    {/* Random recipe button */}
                    <motion.form 
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <motion.button
                            type='submit' 
                            className='px-6 py-3 bg-white border-2 border-orange-300 text-orange-600 font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-orange-50 transition-all duration-300 flex items-center gap-2 mx-auto'
                            onClick={handleRandChange}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <ArrowPathIcon className='h-5 w-5'/>
                            Try Something New!
                        </motion.button>
                    </motion.form>
                </div>

                {/* Loading spinner with better design */}
                {loading && (
                    <motion.div 
                        className="mb-12 flex justify-center items-center space-x-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                        <span className="text-lg font-medium text-gray-600">Searching for delicious recipes...</span>
                    </motion.div>
                )}

                {/* Recipe cards grid with improved layout */}
                <motion.div 
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {foodApiData &&
                        Object.entries(foodApiData)
                        .sort(([, dataA], [, dataB]) => dataA.id - dataB.id)
                        .map(([name, data], index) => (
                            <motion.div
                                key={name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <FoodCard foodAPIwKey={{ name, data }} />
                            </motion.div>
                        ))
                    }
                </motion.div>

                {/* Load more section */}
                {foodApiData && Object.keys(foodApiData).length > 0 && (
                    <motion.form 
                        onSubmit={handleSubmit}
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {loading2 && (
                            <div className="mb-6 flex justify-center items-center space-x-2">
                                <div className="w-6 h-6 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                                <span className="text-gray-600">Loading more recipes...</span>
                            </div>
                        )}
                        <motion.button
                            type='submit' 
                            className='px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300'
                            onClick={handleOffsetChange}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Load More Recipes
                        </motion.button>
                    </motion.form>
                )}
            </motion.div>
        </section>
    );
};

export default Home;