import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  className = '' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-16 h-16'
  };

  return (
    <div className={`spinner border-4 border-gray-200 border-t-primary-600 rounded-full ${sizeClasses[size]} ${className}`}></div>
  );
};

export default LoadingSpinner;
