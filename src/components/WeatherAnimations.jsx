import React, { useEffect, useState } from 'react';

const WeatherAnimations = ({ condition }) => {
  const [animationElements, setAnimationElements] = useState([]);
  
  useEffect(() => {
    // Clean up existing animation elements
    setAnimationElements([]);
    
    // Create new animation elements based on weather condition
    if (condition) {
      const conditionLower = condition.toLowerCase();
      
      if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
        // Create raindrops
        const drops = [];
        const dropCount = 80;
        
        for (let i = 0; i < dropCount; i++) {
          const delay = Math.random() * 5;
          const duration = 0.5 + Math.random() * 0.8;
          
          drops.push({
            id: `raindrop-${i}`,
            type: 'raindrop',
            style: {
              left: `${Math.random() * 100}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              opacity: 0.6 + Math.random() * 0.4
            }
          });
        }
        
        setAnimationElements(drops);
      } 
      else if (conditionLower.includes('snow')) {
        // Create snowflakes
        const flakes = [];
        const flakeCount = 60;
        
        for (let i = 0; i < flakeCount; i++) {
          const size = 2 + Math.random() * 6;
          const delay = Math.random() * 5;
          const duration = 5 + Math.random() * 10;
          
          flakes.push({
            id: `snowflake-${i}`,
            type: 'snowflake',
            style: {
              left: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              opacity: 0.6 + Math.random() * 0.4
            }
          });
        }
        
        setAnimationElements(flakes);
      }
      else if (conditionLower.includes('thunder')) {
        // Lightning effect
        const thunderElements = [];
        
        for (let i = 0; i < 3; i++) {
          const delay = 2 + Math.random() * 8;
          thunderElements.push({
            id: `lightning-${i}`,
            type: 'lightning',
            style: {
              animationDelay: `${delay}s`
            }
          });
        }
        
        setAnimationElements(thunderElements);
      }
      else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
        // Fog particles
        const fogElements = [];
        const fogCount = 8;
        
        for (let i = 0; i < fogCount; i++) {
          const size = 100 + Math.random() * 150;
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const duration = 20 + Math.random() * 30;
          
          fogElements.push({
            id: `fog-${i}`,
            type: 'fog',
            style: {
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${duration}s`
            }
          });
        }
        
        setAnimationElements(fogElements);
      }
    }
  }, [condition]);
  
  if (animationElements.length === 0) return null;
  
  // Determine which animation class to use
  const getAnimationClass = () => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return 'animate-rain';
    } else if (conditionLower.includes('snow')) {
      return 'animate-snow';
    } else if (conditionLower.includes('thunder')) {
      return 'animate-thunder';
    } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
      return 'animate-fog';
    }
    return '';
  };
  
  return (
    <div className={getAnimationClass()}>
      {animationElements.map((element) => (
        <div 
          key={element.id} 
          className={element.type} 
          style={element.style}
        />
      ))}
    </div>
  );
};

export default WeatherAnimations;