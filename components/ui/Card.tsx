import React from 'react';

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-[14px] shadow-md p-6 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
