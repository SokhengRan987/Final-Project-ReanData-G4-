import React from 'react';
import { ChevronDown } from 'lucide-react';

const Dropdown = ({ 
  isOpen = false, 
  toggle = () => {}, 
  options = [], 
  selected = '', 
  onSelect = () => {}, 
  buttonText 
}) => {
  return (
    <div className="relative">
      <button
        className="flex items-center  bg-white px-2 py-2 rounded-lg shadow hover:bg-gray-300 transition-colors"
        onClick={toggle}
      >
        <span>{buttonText || selected}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option) => (
              <button
                key={option}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  selected === option ? 'bg-gray-100 text-blue-600' : 'text-gray-700'
                } hover:bg-gray-100`}
                role="menuitem"
                onClick={() => onSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;