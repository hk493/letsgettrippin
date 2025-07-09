import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useInteractionTracking, useTimeTracking } from '../hooks/useAnalytics';
import { 
  ArrowRightIcon, 
  GlobeIcon, 
  MapPinIcon, 
  PlayIcon, 
  CheckIcon, 
  WifiIcon,
  StarIcon,
  HeartIcon,
  ShieldCheckIcon,
  ZapIcon,
  TrendingUpIcon,
  UsersIcon
} from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Analytics hooks
  const { trackClick, trackFeatureUse } = useInteractionTracking();
  useTimeTracking('home_page');

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleStartJourney = () => {
    trackClick('start_journey_button', 'home_page');
    navigate('/language');
  };

  const handleWatchDemo = () => {
    trackClick('watch_demo_button', 'home_page');
    // Demo video functionality would go here
  };

  const handleFeatureClick = (featureName: string) => {
    trackFeatureUse(featureName);
  };

  const features = [
    {
      icon: <WifiIcon className="w-8 h-8" />,
      title: "Instant eSIM Connection",
      description: "Get connected in 60 seconds. No SIM swapping, no hassle.",
      color: "from-blue-500 to-cyan-500",
      stats: "99.9% Success Rate"
    },
    {
      icon: <GlobeIcon className="w-8 h-8" />,
      title: "AI-Powered Translation",
      description: "Real-time translation for menus, signs, and conversations.",
      color: "from-purple-500 to-pink-500",
      stats: "50+ Languages"
    },
    {
      icon: <MapPinIcon className="w-8 h-8" />,
      title: "Smart Local Guide",
      description: "Discover hidden gems and get personalized recommendations.",
      color: "from-green-500 to-emerald-500",
      stats: "10,000+ Spots"
    },
    {
      icon: <ZapIcon className="w-8 h-8" />,
      title: "Exclusive Discounts",
      description: "Save up to 50% at restaurants, attractions, and shops.",
      color: "from-orange-500 to-red-500",
      stats: "Save ¥15,000+"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Kim",
      country: "🇰🇷 Seoul",
      text: "DataPocket made my Tokyo trip incredible! The translation feature saved me so many times, and I saved ¥15,000 with the coupons!",
      rating: 5,
      image: "👩‍💼",
      trip: "7-day Tokyo Adventure"
    },
    {
      name: "Chen Wei",
      country: "🇹🇼 Taipei", 
      text: "Best travel app ever! The AR navigation helped me find amazing local spots that tourists never see. Highly recommended!",
      rating: 5,
      image: "👨‍💻",
      trip: "14-day Japan Explorer"
    },
    {
      name: "Alex Johnson",
      country: "🇺🇸 California",
      text: "From eSIM setup to finding the best ramen shops, DataPocket was my perfect travel companion in Japan.",
      rating: 5,
      image: "👨‍🎨",
      trip: "10-day Cultural Journey"
    },
    {
      name: "Maria Santos",
      country: "🇧🇷 São Paulo",
      text: "The instant connection at Narita was a lifesaver! No more expensive roaming charges. DataPocket is genius!",
      rating: 5,
      image: "👩‍🎓",
      trip: "5-day Business Trip"
    }
  ];

  const pricingPlans = [
    {
      name: "Explorer",
      duration: "3 Days",
      data: "1GB",
      price: "¥980",
      originalPrice: "¥1,500",
      features: ["eSIM Connection", "Basic Translation", "Local Spots", "Standard Support"],
      popular: false,
      color: "from-blue-500 to-cyan-500",
      badge: "Best for Short Trips"
    },
    {
      name: "Adventurer", 
      duration: "7 Days",
      data: "3GB",
      price: "¥1,980",
      originalPrice: "¥3,000",
      features: ["Everything in Explorer", "AI Translation", "AR Navigation", "Premium Coupons", "Priority Support"],
      popular: true,
      color: "from-purple-500 to-pink-500",
      badge: "Most Popular"
    },
    {
      name: "Nomad",
      duration: "30 Days", 
      data: "10GB",
      price: "¥3,980",
      originalPrice: "¥6,000",
      features: ["Everything in Adventurer", "Unlimited Translation", "Personal Travel AI", "VIP Discounts", "24/7 Concierge"],
      popular: false,
      color: "from-green-500 to-emerald-500",
      badge: "Best Value"
    }
  ];

  const stats = [
    { number: "100K+", label: "Happy Travelers", icon: <UsersIcon className="w-6 h-6" /> },
    { number: "50+", label: "Countries Served", icon: <GlobeIcon className="w-6 h-6" /> },
    { number: "99.9%", label: "Success Rate", icon: <TrendingUpIcon className="w-6 h-6" /> },
    { number: "4.9/5", label: "User Rating", icon: <StarIcon className="w-6 h-6" /> }
  ];

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
          <div className="text-center max-w-5xl mx-auto">
            {/* Logo & Brand */}
            <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg mb-8">
                <img 
                  src="/datapocket-logo-latest.png" 
                  alt="DataPocket" 
                  className="w-16 h-16 mr-4"
                  onError={(e) => {
                    e.currentTarget.src = "/datapocket-logo.png";
                  }}
                />
                <div className="text-left">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                    DataPocket
                  </span>
                  <span className="text-sm text-gray-600">Your Japan Connection</span>
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className={`text-6xl md:text-8xl font-bold mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Let&apos;s Get Trippin&apos;
              </span>
              <br />
              <span className="text-gray-800 text-4xl md:text-6xl">Your Japan Adventure Starts Here</span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              The ultimate travel companion for your Japan journey. Get connected, get exploring, get trippin&apos;.
            </p>

            {/* Value Proposition */}
            <div className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <span className="text-green-600 font-semibold">✓ Save 90% on roaming</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <span className="text-blue-600 font-semibold">✓ 60-second setup</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <span className="text-purple-600 font-semibold">✓ AI-powered guide</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <span className="text-orange-600 font-semibold">✓ Exclusive discounts</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <button
                onClick={handleStartJourney}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-5 rounded-full font-bold text-xl transition-all duration-300 flex items-center justify-center group shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                Start Your Journey
                <ArrowRightIcon className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={handleWatchDemo}
                className="bg-white/90 backdrop-blur-sm text-gray-800 border-2 border-gray-200 px-12 py-5 rounded-full font-semibold text-xl hover:bg-white transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <PlayIcon className="w-6 h-6 mr-3" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="text-blue-600 mb-2 flex justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Everything You Need in One App
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop juggling multiple apps. DataPocket is your all-in-one travel companion for Japan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 hover:border-gray-200"
                onMouseEnter={() => handleFeatureClick(feature.title)}
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center mb-4">{feature.description}</p>
                <div className="text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${feature.color} text-white`}>
                    {feature.stats}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              What Travelers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied travelers who&apos;ve discovered Japan with DataPocket
            </p>
          </div>

          {/* Featured Testimonial */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-3xl p-12 shadow-2xl transform transition-all duration-500">
              <div className="text-center mb-8">
                <div className="text-8xl mb-4">{testimonials[currentTestimonial].image}</div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">{testimonials[currentTestimonial].name}</h4>
                <p className="text-gray-500 mb-2">{testimonials[currentTestimonial].country}</p>
                <p className="text-blue-600 font-semibold">{testimonials[currentTestimonial].trip}</p>
              </div>
              <blockquote className="text-xl text-gray-700 text-center mb-8 italic">
                &ldquo;{testimonials[currentTestimonial].text}&rdquo;
              </blockquote>
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <StarIcon key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Testimonial Navigation */}
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* All Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  index === currentTestimonial ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setCurrentTestimonial(index)}
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.image}</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.country}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{testimonial.text}</p>
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choose Your Adventure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible plans for every type of traveler. All plans include our premium features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 ${
                  plan.popular ? 'border-purple-200 shadow-purple-100 scale-105' : 'border-gray-100'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-2 rounded-full text-sm font-bold flex items-center">
                    <StarIcon className="w-4 h-4 mr-1" />
                    {plan.badge}
                  </div>
                )}
                
                {!plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    {plan.badge}
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <div className="text-gray-500 line-through text-lg">{plan.originalPrice}</div>
                  </div>
                  <p className="text-gray-600">{plan.duration} • {plan.data}</p>
                  <div className="mt-2">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Save {Math.round(((parseInt(plan.originalPrice.replace('¥', '').replace(',', '')) - parseInt(plan.price.replace('¥', '').replace(',', ''))) / parseInt(plan.originalPrice.replace('¥', '').replace(',', ''))) * 100)}%
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleStartJourney()}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    plan.popular
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>

          {/* Money Back Guarantee */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-full px-8 py-4">
              <ShieldCheckIcon className="w-6 h-6 text-green-600 mr-3" />
              <span className="text-green-800 font-semibold">30-Day Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready for Your Japan Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Join over 100,000 travelers who&apos;ve made their Japan dreams come true with DataPocket.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleStartJourney}
              className="bg-white text-purple-600 px-12 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center group shadow-2xl transform hover:scale-105"
            >
              Start Your Journey Now
              <ArrowRightIcon className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={handleWatchDemo}
              className="border-2 border-white text-white px-12 py-5 rounded-full font-semibold text-xl hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center justify-center transform hover:scale-105"
            >
              <PlayIcon className="w-6 h-6 mr-3" />
              Watch Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-80">
            <div className="flex items-center">
              <HeartIcon className="w-5 h-5 text-white mr-2" />
              <span className="text-white">Loved by travelers</span>
            </div>
            <div className="flex items-center">
              <ShieldCheckIcon className="w-5 h-5 text-white mr-2" />
              <span className="text-white">Secure & trusted</span>
            </div>
            <div className="flex items-center">
              <ZapIcon className="w-5 h-5 text-white mr-2" />
              <span className="text-white">Instant activation</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;