import React from 'react'
import { RocketIcon, ArrowRightIcon } from 'lucide-react'

export const DemoAccessButton = () => {
  const handleDemoAccess = () => {
    // Multiple ways to access demo
    window.location.href = '/?demo=true'
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={handleDemoAccess}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center group shadow-xl hover:shadow-2xl transform hover:scale-105"
      >
        <RocketIcon className="w-5 h-5 mr-2" />
        <span>体験デモ</span>
        <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  )
}