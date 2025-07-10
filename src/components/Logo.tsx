import React from 'react'

export const Logo = ({ size = 'medium', onClick }) => {
  const sizeClasses = {
    small: 'h-12',
    medium: 'h-16',
    large: 'h-24',
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-3 transition-transform hover:scale-105"
      aria-label="Go to home"
    >
      {/* Latest Datapocket Logo */}
      <img
        src="/datapocket-logo-latest.png"
        alt="Datapocket Logo"
        className={`${sizeClasses[size]} w-auto object-contain`}
        onError={(e) => {
          console.log('Primary logo failed, trying fallback...')
          e.target.src = "/datapocket-logo.png"
          e.target.onerror = () => {
            console.log('All logos failed, hiding element')
            e.target.style.display = 'none'
          }
        }}
      />
    </button>
  )
}