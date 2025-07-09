import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useInteractionTracking } from '../hooks/useAnalytics';
import { 
  WifiIcon, 
  CheckIcon, 
  StarIcon, 
  ZapIcon,
  GlobeIcon,
  ShieldCheckIcon,
  ClockIcon,
  TrendingUpIcon,
  ArrowRightIcon,
  SparklesIcon,
  HeartIcon
} from 'lucide-react';

const ESIMPlansPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { trackClick } = useInteractionTracking();
  
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  const plans = [
    {
      id: 'explorer',
      name: 'Explorer',
      duration: '3 Days',
      data: '1GB',
      price: 980,
      originalPrice: 1500,
      popular: false,
      color: 'from-blue-500 to-cyan-500',
      badge: 'Perfect for Short Trips',
      features: [
        'High-speed 4G/5G network',
        'Instant activation',
        'No roaming charges',
        'Works with all major carriers',
        'Email support',
        'Basic travel guide'
      ],
      savings: '35% OFF',
      bestFor: ['Weekend trips', 'Business travel', 'First-time visitors'],
      coverage: ['Tokyo', 'Osaka', 'Kyoto', 'Major cities'],
      speedTest: '50-100 Mbps',
      activation: 'Instant'
    },
    {
      id: 'adventurer',
      name: 'Adventurer',
      duration: '7 Days',
      data: '3GB',
      price: 1980,
      originalPrice: 3000,
      popular: true,
      color: 'from-purple-500 to-pink-500',
      badge: 'Most Popular Choice',
      features: [
        'Everything in Explorer',
        'Premium 5G speeds',
        'Unlimited social media',
        'AI translation app',
        'Priority support',
        'Exclusive discounts',
        'Offline maps',
        'Travel insurance'
      ],
      savings: '34% OFF',
      bestFor: ['Week-long adventures', 'Cultural exploration', 'Food tours'],
      coverage: ['All major cities', 'Rural areas', 'Tourist destinations'],
      speedTest: '100-200 Mbps',
      activation: 'Instant'
    },
    {
      id: 'nomad',
      name: 'Digital Nomad',
      duration: '30 Days',
      data: '10GB',
      price: 3980,
      originalPrice: 6000,
      popular: false,
      color: 'from-green-500 to-emerald-500',
      badge: 'Best Value for Long Stays',
      features: [
        'Everything in Adventurer',
        'Unlimited data after 10GB',
        'Hotspot capability',
        'VPN included',
        '24/7 concierge support',
        'Personal travel assistant',
        'Premium restaurant reservations',
        'Airport lounge access'
      ],
      savings: '34% OFF',
      bestFor: ['Extended stays', 'Remote work', 'Deep exploration'],
      coverage: ['Nationwide coverage', 'Remote areas', 'Mountain regions'],
      speedTest: '200+ Mbps',
      activation: 'Instant'
    }
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    trackClick(`select_plan_${plan.id}`, 'esim_plans');
  };

  const handleContinueToPayment = () => {
    if (selectedPlan) {
      trackClick('continue_to_payment', 'esim_plans');
      navigate('/payment', { state: { plan: selectedPlan } });
    }
  };

  const features = [
    {
      icon: <ZapIcon className="w-8 h-8" />,
      title: 'Instant Activation',
      description: 'Get connected in 60 seconds',
      color: 'text-yellow-600'
    },
    {
      icon: <GlobeIcon className="w-8 h-8" />,
      title: 'Nationwide Coverage',
      description: 'Works everywhere in Japan',
      color: 'text-blue-600'
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: 'Secure Connection',
      description: 'Enterprise-grade security',
      color: 'text-green-600'
    },
    {
      icon: <TrendingUpIcon className="w-8 h-8" />,
      title: 'High-Speed 5G',
      description: 'Up to 200 Mbps speeds',
      color: 'text-purple-600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Kim',
      country: '🇰🇷 Seoul',
      text: 'The eSIM worked perfectly throughout my entire trip. Setup was incredibly easy!',
      rating: 5,
      plan: 'Adventurer'
    },
    {
      name: 'Mike Johnson',
      country: '🇺🇸 California',
      text: 'Saved me hundreds on roaming charges. The speed was amazing even in rural areas.',
      rating: 5,
      plan: 'Digital Nomad'
    },
    {
      name: 'Emma Wilson',
      country: '🇬🇧 London',
      text: 'Perfect for my weekend trip to Tokyo. Activated instantly at the airport.',
      rating: 5,
      plan: 'Explorer'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg mb-8">
            <img 
              src="/datapocket-logo-latest.png" 
              alt="DataPocket" 
              className="w-12 h-12 mr-3"
              onError={(e) => {
                e.currentTarget.src = "/datapocket-logo.png";
              }}
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DataPocket
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your eSIM Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Stay connected throughout Japan with our premium eSIM plans. No physical SIM card needed!
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
              <span>100,000+ satisfied customers</span>
            </div>
            <div className="flex items-center">
              <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
              <span>99.9% network reliability</span>
            </div>
            <div className="flex items-center">
              <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
              <span>24/7 customer support</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className={`${feature.color} mb-4 flex justify-center`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 ${
                selectedPlan?.id === plan.id
                  ? 'border-blue-500 ring-4 ring-blue-100'
                  : plan.popular
                  ? 'border-purple-200'
                  : 'border-gray-100'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                  <StarIcon className="w-4 h-4 mr-1" />
                  {plan.badge}
                </div>
              )}

              {/* Savings Badge */}
              <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                {plan.savings}
              </div>

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-4`}>
                    <WifiIcon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.duration} • {plan.data}</p>
                  
                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-4xl font-bold text-gray-800">¥{plan.price.toLocaleString()}</span>
                    </div>
                    <div className="text-gray-500 line-through text-lg">¥{plan.originalPrice.toLocaleString()}</div>
                    <div className="text-green-600 font-semibold text-sm">
                      Save ¥{(plan.originalPrice - plan.price).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Plan Details */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Speed:</span>
                    <span className="font-semibold">{plan.speedTest}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Activation:</span>
                    <span className="font-semibold text-green-600">{plan.activation}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Coverage:</span>
                    <span className="font-semibold">{plan.coverage.length} areas</span>
                  </div>
                </div>

                {/* Select Button */}
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    selectedPlan?.id === plan.id
                      ? 'bg-blue-600 text-white'
                      : plan.popular
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
                  }`}
                >
                  {selectedPlan?.id === plan.id ? (
                    <span className="flex items-center justify-center">
                      <CheckIcon className="w-5 h-5 mr-2" />
                      Selected
                    </span>
                  ) : (
                    'Select Plan'
                  )}
                </button>

                {/* Best For */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 mb-2">Perfect for:</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {plan.bestFor.map((use, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        {selectedPlan && (
          <div className="text-center mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${selectedPlan.color} flex items-center justify-center mr-4`}>
                  <WifiIcon className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold">{selectedPlan.name} Plan</h3>
                  <p className="text-gray-600">{selectedPlan.duration} • {selectedPlan.data}</p>
                  <p className="text-2xl font-bold text-blue-600">¥{selectedPlan.price.toLocaleString()}</p>
                </div>
              </div>
              
              <button
                onClick={handleContinueToPayment}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center mx-auto group shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Continue to Payment
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">👤</div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.country}</p>
                    <p className="text-xs text-blue-600">{testimonial.plan} Plan</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-2">How do I activate my eSIM?</h3>
              <p className="text-gray-600 text-sm mb-4">Simply scan the QR code we send you after purchase. Activation takes less than 60 seconds.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Which devices are compatible?</h3>
              <p className="text-gray-600 text-sm mb-4">Most modern smartphones including iPhone XR and newer, Google Pixel 3 and newer, Samsung Galaxy S20 and newer.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Can I use hotspot?</h3>
              <p className="text-gray-600 text-sm mb-4">Yes! All our plans support hotspot functionality so you can share your connection with other devices.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">What if I need help?</h3>
              <p className="text-gray-600 text-sm mb-4">Our support team is available 24/7 via chat, email, or phone to help with any issues.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESIMPlansPage;