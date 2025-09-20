import { useState } from 'react';
import { motion } from "framer-motion";
import { FoodAPIwKey } from '@/shared/types';
import {
  ChefHat,
  Globe2,
  Clock,
  Heart,
  ExternalLink,
  Sparkles
} from "lucide-react";

type Props = {
  foodAPIwKey: FoodAPIwKey;
}

function FoodCard({ foodAPIwKey }: Props) {
  const [isFlipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!isFlipped);
  };

  // Generate a gradient based on cuisine type or use default
  const getGradientColors = (cuisine: string) => {
    const gradients = {
      'North Indian': 'from-red-400 to-orange-500',
      'South Indian': 'from-green-400 to-emerald-500',
      'Gujarati': 'from-yellow-400 to-amber-500',
      'Punjabi': 'from-orange-400 to-red-500',
      'Bengali': 'from-pink-400 to-rose-500',
      'Maharashtrian': 'from-purple-400 to-violet-500',
      'default': 'from-orange-400 to-red-500'
    };
    
    return gradients[cuisine as keyof typeof gradients] || gradients.default;
  };

  const gradientClass = getGradientColors(foodAPIwKey.data.cuisine);

  return (
    <motion.div
      className="relative flex w-full max-w-sm mx-auto min-h-[20rem] cursor-pointer"
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {!isFlipped ? (
        // Front of card
        <div className={`w-full rounded-2xl bg-gradient-to-br ${gradientClass} p-1 shadow-xl`}>
          <div className="w-full bg-white rounded-xl p-6 flex flex-col justify-between min-h-[19rem]">
            {/* Header with sparkles icon */}
            <div className="text-center flex-shrink-0">
              <Sparkles className="h-8 w-8 text-orange-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-800 leading-tight mb-3">
                {foodAPIwKey.name}
              </h2>
              <div className={`h-1 w-16 bg-gradient-to-r ${gradientClass} rounded-full mx-auto`}></div>
            </div>

            {/* Quick info badges */}
            <div className="space-y-3 flex-grow flex flex-col justify-center py-4">
              <div className="flex items-center justify-center space-x-2">
                <Globe2 className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-600 bg-orange-50 px-3 py-1 rounded-full">
                  {foodAPIwKey.data.cuisine}
                </span>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <ChefHat className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
                  {foodAPIwKey.data.course}
                </span>
              </div>

              {foodAPIwKey.data.diet && (
                <div className="flex items-center justify-center space-x-2">
                  <Heart className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-600 bg-green-50 px-3 py-1 rounded-full">
                    {foodAPIwKey.data.diet}
                  </span>
                </div>
              )}
            </div>

            {/* Click to flip indicator */}
            <div className="text-center flex-shrink-0 mt-4">
              <p className="text-xs text-gray-400">Click to see details</p>
            </div>
          </div>
        </div>
      ) : (
        // Back of card
        <div className={`w-full rounded-2xl bg-gradient-to-br ${gradientClass} p-1 shadow-xl`}>
          <div className="w-full bg-white rounded-xl p-6 flex flex-col">
            {/* Header */}
            <div className="text-center mb-6 flex-shrink-0">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {foodAPIwKey.name}
              </h3>
              <div className={`h-1 w-12 bg-gradient-to-r ${gradientClass} rounded-full mx-auto`}></div>
            </div>

            {/* Details - flexible content area */}
            <div className="flex-grow space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <Globe2 className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-gray-700">Cuisine: </span>
                  <span className="text-gray-600">{foodAPIwKey.data.cuisine}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-gray-700">Course: </span>
                  <span className="text-gray-600">{foodAPIwKey.data.course}</span>
                </div>
              </div>

              {foodAPIwKey.data.diet && (
                <div className="flex items-start space-x-3">
                  <Heart className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="font-semibold text-gray-700">Diet: </span>
                    <span className="text-gray-600">{foodAPIwKey.data.diet}</span>
                  </div>
                </div>
              )}

              {foodAPIwKey.data.ingredients && (
                <div className="flex items-start space-x-3">
                  <ChefHat className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="font-semibold text-gray-700">Key Ingredients: </span>
                    <span className="text-gray-600 text-xs leading-relaxed block mt-1">
                      {foodAPIwKey.data.ingredients}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Recipe button */}
            <div className="pt-6 flex-shrink-0">
              <a 
                href={foodAPIwKey.data.websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full block"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button 
                  className={`w-full py-3 bg-gradient-to-r ${gradientClass} text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                >
                  <span>Get Full Recipe</span>
                  <ExternalLink className="h-4 w-4" />
                </motion.button>
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default FoodCard;