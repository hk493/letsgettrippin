import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { ArrowRightIcon, GlobeIcon, ZapIcon, ShieldCheckIcon, MapPinIcon, VibrateIcon as TranslateIcon, CameraIcon, GiftIcon, StarIcon, PlayIcon, CheckIcon, WifiIcon, SmartphoneIcon, HeartIcon, TrendingUpIcon } from 'lucide-react'

export const NewLandingPage = ({ onGetStarted }) => {
  const { t, currentLanguage } = useLanguage()
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: <WifiIcon className="w-8 h-8" />,
      title: "Instant eSIM Connection",
      description: "Get connected in 60 seconds. No SIM swapping, no hassle.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <TranslateIcon className="w-8 h-8" />,
      title: "AI-Powered Translation",
      description: "Real-time translation for menus, signs, and conversations.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <MapPinIcon className="w-8 h-8" />,
      title: "Smart Local Guide",
      description: "Discover hidden gems and get personalized recommendations.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <GiftIcon className="w-8 h-8" />,
      title: "Exclusive Discounts",
      description: "Save up to 50% at restaurants, attractions, and shops.",
      color: "from-orange-500 to-red-500"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Kim",
      country: "🇰🇷 Seoul",
      text: "DataPocket made my Tokyo trip incredible! The translation feature saved me so many times, and I saved ¥15,000 with the coupons!",
      rating: 5,
      image: "👩‍💼"
    },
    {
      name: "Chen Wei",
      country: "🇹🇼 Taipei", 
      text: "Best travel app ever! The AR navigation helped me find amazing local spots that tourists never see. Highly recommended!",
      rating: 5,
      image: "👨‍💻"
    },
    {
      name: "Alex Johnson",
      country: "🇺🇸 California",
      text: "From eSIM setup to finding the best ramen shops, DataPocket was my perfect travel companion in Japan.",
      rating: 5,
      image: "👨‍🎨"
    }
  ]

  const pricingPlans = [
    {
      name: "Explorer",
      duration: "3 Days",
      data: "1GB",
      price: "¥980",
      features: ["eSIM Connection", "Basic Translation", "Local Spots", "Standard Support"],
      popular: false,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Adventurer", 
      duration: "7 Days",
      data: "3GB",
      price: "¥1,980",
      features: ["Everything in Explorer", "AI Translation", "AR Navigation", "Premium Coupons", "Priority Support"],
      popular: true,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Nomad",
      duration: "30 Days", 
      data: "10GB",
      price: "¥3,980",
      features: ["Everything in Adventurer", "Unlimited Translation", "Personal Travel AI", "VIP Discounts", "24/7 Concierge"],
      popular: false,
      color: "from-green-500 to-emerald-500"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo & Brand */}
            <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-6">
                <img 
                  src="/datapocket-logo-latest.png" 
                  alt="DataPocket" 
                  className="w-12 h-12 mr-3"
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t('yourJapanConnection')}
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('travelSmarter')}
              </span>
              <br />
              <span className="text-gray-800">{t('notHarder')}</span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {t('appValueProp')}
            </p>

            {/* Value Proposition */}
            <div className={`flex flex-wrap justify-center gap-4 mb-8 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <span className="text-green-600 font-semibold">✓ Save 90% on roaming</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <span className="text-blue-600 font-semibold">✓ 60-second setup</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <span className="text-purple-600 font-semibold">✓ AI-powered guide</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center group shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Start Your Journey
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="bg-white/80 backdrop-blur-sm text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-full font-semibold hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl">
                <PlayIcon className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className={`text-center transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center justify-center space-x-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                <span className="text-gray-600 ml-2">4.9/5 from 10,000+ travelers</span>
              </div>
              <p className="text-gray-500">Trusted by travelers from 50+ countries</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Everything You Need in One App
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop juggling multiple apps. DataPocket is your all-in-one travel companion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              From download to exploring - it takes less than 5 minutes
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Download & Connect",
                  description: "Get your eSIM instantly. Scan QR code and you're connected in 60 seconds.",
                  icon: <SmartphoneIcon className="w-8 h-8" />,
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  step: "02", 
                  title: "Explore with AI",
                  description: "Let our AI guide you to hidden gems, translate everything, and find the best deals.",
                  icon: <CameraIcon className="w-8 h-8" />,
                  color: "from-purple-500 to-pink-500"
                },
                {
                  step: "03",
                  title: "Save & Share",
                  description: "Use exclusive coupons, collect memories, and share your amazing journey.",
                  icon: <HeartIcon className="w-8 h-8" />,
                  color: "from-green-500 to-emerald-500"
                }
              ].map((step, index) => (
                <div key={index} className="relative text-center">
                  {/* Connection Line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 z-0"></div>
                  )}
                  
                  <div className="relative z-10 bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    {/* Step Number */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white mb-6 mx-auto`}>
                      {step.icon}
                    </div>
                    
                    <div className={`text-4xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-4`}>
                      {step.step}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 text-gray-800">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choose Your Adventure
            </h2>
            <p className="text-xl text-gray-600">
              All plans include eSIM, AI features, and exclusive discounts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  plan.popular ? 'ring-4 ring-purple-500 ring-opacity-50 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center text-white mb-6`}>
                  <GlobeIcon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2">
                  <span className={`bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                    {plan.price}
                  </span>
                </div>
                <p className="text-gray-500 mb-6">{plan.duration} • {plan.data}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={onGetStarted}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                    plan.popular
                      ? `bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl`
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Loved by Travelers Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of happy travelers who chose DataPocket
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl mr-4">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.country}</div>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join over 50,000 travelers who've made their trips unforgettable with DataPocket
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center group shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Start Your Journey Now
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="mt-8 text-white/80">
            <p className="text-sm">✓ 60-second setup • ✓ No hidden fees • ✓ 24/7 support</p>
          </div>
        </div>
      </section>
    </div>
  )
}