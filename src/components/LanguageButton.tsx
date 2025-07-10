import React from 'react'

export const LanguageButton = ({
  language,
  flag,
  name,
  onClick,
  isSelected,
}) => {
  return (
    <button
      onClick={() => onClick(language)}
      className={`
        flex flex-col items-center p-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105
        ${isSelected 
          ? 'bg-gradient-to-br from-pink-100 to-blue-100 border-2 border-pink-300 scale-105' 
          : 'bg-white hover:bg-gray-50 border-2 border-transparent hover:border-gray-200'
        }
        w-full max-w-xs mx-auto group
      `}
    >
      <div className={`text-4xl mb-3 transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
        {flag}
      </div>
      <div className={`text-lg font-semibold transition-colors duration-300 ${isSelected ? 'text-indigo-600' : 'text-gray-800'}`}>
        {name}
      </div>
      {isSelected && (
        <div className="mt-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      )}
    </button>
  )
}