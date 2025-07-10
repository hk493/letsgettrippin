import React from 'react'
import { GlobeIcon, MapPinIcon, WifiIcon, VibrateIcon as TranslateIcon, CameraIcon, GiftIcon, CompassIcon, StarIcon, HeartIcon, ZapIcon } from 'lucide-react'

export const BrandIdentity = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Brand Overview */}
      <section className="text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          DataPocket Brand Identity
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          "旅の通信を、旅の体験に。" - Transforming travel connectivity into travel experiences
        </p>
      </section>

      {/* Logo Concepts */}
      <section className="bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Logo Concepts</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Concept 1: Pocket Globe */}
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <div className="relative">
                <GlobeIcon className="w-12 h-12 text-white" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <WifiIcon className="w-3 h-3 text-blue-500" />
                </div>
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2">Pocket Globe</h3>
            <p className="text-sm text-gray-600">World connectivity in your pocket</p>
          </div>

          {/* Concept 2: Travel Companion */}
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <div className="relative">
                <CompassIcon className="w-12 h-12 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2">Smart Compass</h3>
            <p className="text-sm text-gray-600">AI-guided travel navigation</p>
          </div>

          {/* Concept 3: Pocket Portal */}
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <div className="relative">
                <div className="w-12 h-8 bg-white/20 rounded-lg border-2 border-white flex items-center justify-center">
                  <MapPinIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2">Pocket Portal</h3>
            <p className="text-sm text-gray-600">Gateway to local experiences</p>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Color Palette</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Primary Colors */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-700">Primary Colors</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg"></div>
                <div>
                  <div className="font-bold">Ocean Blue</div>
                  <div className="text-sm text-gray-500">#3B82F6 - Trust & Reliability</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg"></div>
                <div>
                  <div className="font-bold">Innovation Purple</div>
                  <div className="text-sm text-gray-500">#8B5CF6 - Technology & AI</div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Colors */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-700">Secondary Colors</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl shadow-lg"></div>
                <div>
                  <div className="font-bold">Adventure Pink</div>
                  <div className="text-sm text-gray-500">#EC4899 - Fun & Discovery</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg"></div>
                <div>
                  <div className="font-bold">Success Green</div>
                  <div className="text-sm text-gray-500">#10B981 - Achievement & Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Examples */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-gray-700">Brand Gradients</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Primary</span>
            </div>
            <div className="h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Creative</span>
            </div>
            <div className="h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl shadow-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Success</span>
            </div>
            <div className="h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* Character Concepts */}
      <section className="bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Mascot Characters</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Pocket Fairy */}
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl">
              🧚‍♀️
            </div>
            <h3 className="font-bold text-lg mb-2">Pocket Fairy</h3>
            <p className="text-sm text-gray-600">Magical travel guide that lives in your phone</p>
            <div className="mt-4 space-y-2 text-xs">
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Helpful</div>
              <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Magical</div>
            </div>
          </div>

          {/* Travel Fox */}
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-4xl">
              🦊
            </div>
            <h3 className="font-bold text-lg mb-2">Kitsune Guide</h3>
            <p className="text-sm text-gray-600">Clever fox that knows all the local secrets</p>
            <div className="mt-4 space-y-2 text-xs">
              <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Smart</div>
              <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full">Local Expert</div>
            </div>
          </div>

          {/* Pocket Robot */}
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-4xl">
              🤖
            </div>
            <h3 className="font-bold text-lg mb-2">AI Companion</h3>
            <p className="text-sm text-gray-600">Friendly AI that learns your travel preferences</p>
            <div className="mt-4 space-y-2 text-xs">
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full">AI-Powered</div>
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Personalized</div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Typography</h2>
        
        <div className="space-y-8">
          {/* Primary Font */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-700">Primary Font: Poppins</h3>
            <div className="space-y-4">
              <div className="text-4xl font-bold">DataPocket</div>
              <div className="text-2xl font-semibold">Your Travel Companion</div>
              <div className="text-lg font-medium">Connecting you to amazing experiences</div>
              <div className="text-base">Perfect for headlines, buttons, and key messaging</div>
            </div>
          </div>

          {/* Secondary Font */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-700">Secondary Font: Inter</h3>
            <div className="space-y-2 font-sans">
              <div className="text-lg">Clean and readable for body text</div>
              <div className="text-base">Excellent legibility on mobile devices</div>
              <div className="text-sm">Perfect for descriptions and detailed content</div>
            </div>
          </div>
        </div>
      </section>

      {/* Voice & Tone */}
      <section className="bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Voice & Tone</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-700">Brand Personality</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span><strong>Friendly:</strong> Like a helpful local friend</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span><strong>Smart:</strong> AI-powered but approachable</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <span><strong>Adventurous:</strong> Encouraging exploration</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span><strong>Reliable:</strong> Always there when you need it</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-700">Communication Style</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="font-semibold text-blue-800">✓ Do</div>
                <div className="text-sm text-blue-700">Use simple, clear language</div>
                <div className="text-sm text-blue-700">Be encouraging and positive</div>
                <div className="text-sm text-blue-700">Focus on experiences, not features</div>
              </div>
              
              <div className="p-4 bg-red-50 rounded-xl">
                <div className="font-semibold text-red-800">✗ Don't</div>
                <div className="text-sm text-red-700">Use technical jargon</div>
                <div className="text-sm text-red-700">Be overly formal or corporate</div>
                <div className="text-sm text-red-700">Create fear or urgency</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Applications */}
      <section className="bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Brand Applications</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* App Icon */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 text-gray-700">App Icon</h3>
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-xl flex items-center justify-center mb-4">
              <div className="relative">
                <GlobeIcon className="w-16 h-16 text-white" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <WifiIcon className="w-4 h-4 text-blue-500" />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">Recognizable at any size</p>
          </div>

          {/* Business Card */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 text-gray-700">Business Card</h3>
            <div className="w-64 h-40 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white text-left">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <GlobeIcon className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg">DataPocket</span>
              </div>
              <div className="text-sm opacity-90">
                <div>Your Travel Companion</div>
                <div className="mt-2">datapocket.com</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}