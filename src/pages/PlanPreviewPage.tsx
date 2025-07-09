import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useInteractionTracking } from '../hooks/useAnalytics';
import { generateTravelPlan } from '../utils/openaiApi';
import { 
  MapPinIcon, 
  CalendarIcon, 
  StarIcon, 
  Share2Icon, 
  UsersIcon, 
  ArrowLeftIcon, 
  GlobeIcon, 
  ArrowRightIcon,
  ClockIcon,
  HeartIcon,
  CameraIcon,
  UtensilsIcon,
  ShoppingBagIcon,
  SparklesIcon,
  DownloadIcon
} from 'lucide-react';

const PlanPreviewPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { trackClick } = useInteractionTracking();
  
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(1);
  
  const preferences = location.state?.preferences;

  useEffect(() => {
    if (preferences) {
      generatePlan();
    } else {
      navigate('/plan');
    }
  }, [preferences]);

  const generatePlan = async () => {
    setLoading(true);
    try {
      const prompt = `Create a detailed travel plan for Japan with the following preferences:
        - Destination: ${preferences.destination}
        - Duration: ${preferences.startDate} to ${preferences.endDate}
        - Travelers: ${preferences.travelers}
        - Budget: ${preferences.budget}
        - Interests: ${preferences.interests.join(', ')}
        - Travel Style: ${preferences.travelStyle}
        - Accommodation: ${preferences.accommodation}
        
        Please provide a day-by-day itinerary with specific recommendations for activities, restaurants, and attractions.`;
      
      const response = await generateTravelPlan(prompt);
      
      // Mock plan data for demo
      const mockPlan = {
        title: `${preferences.destination} Adventure`,
        duration: Math.ceil((new Date(preferences.endDate).getTime() - new Date(preferences.startDate).getTime()) / (1000 * 60 * 60 * 24)),
        travelers: preferences.travelers,
        budget: preferences.budget,
        interests: preferences.interests,
        days: generateMockDays(preferences),
        highlights: [
          'Visit iconic temples and shrines',
          'Experience authentic Japanese cuisine',
          'Explore traditional neighborhoods',
          'Enjoy cherry blossom viewing (seasonal)'
        ],
        estimatedCost: calculateEstimatedCost(preferences),
        tips: [
          'Download offline maps before traveling',
          'Learn basic Japanese phrases',
          'Carry cash as many places don\'t accept cards',
          'Respect local customs and etiquette'
        ]
      };
      
      setPlan(mockPlan);
    } catch (error) {
      console.error('Error generating plan:', error);
      // Fallback to mock data
      setPlan(generateMockPlan(preferences));
    } finally {
      setLoading(false);
    }
  };

  const generateMockDays = (prefs) => {
    const duration = Math.ceil((new Date(prefs.endDate).getTime() - new Date(prefs.startDate).getTime()) / (1000 * 60 * 60 * 24));
    const days = [];
    
    for (let i = 1; i <= duration; i++) {
      days.push({
        day: i,
        date: new Date(new Date(prefs.startDate).getTime() + (i - 1) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        title: `Day ${i} - ${getDayTitle(i, prefs)}`,
        activities: getDayActivities(i, prefs),
        meals: getDayMeals(i, prefs),
        transportation: getDayTransportation(i, prefs),
        budget: getDayBudget(prefs.budget)
      });
    }
    
    return days;
  };

  const getDayTitle = (day, prefs) => {
    const titles = {
      1: 'Arrival & First Impressions',
      2: 'Cultural Exploration',
      3: 'Food & Local Life',
      4: 'Nature & Relaxation',
      5: 'Shopping & Entertainment'
    };
    return titles[day] || 'Adventure Continues';
  };

  const getDayActivities = (day, prefs) => {
    const baseActivities = [
      { time: '09:00', title: 'Morning Temple Visit', place: 'Senso-ji Temple', type: 'culture', icon: '⛩️', duration: '2 hours' },
      { time: '14:00', title: 'Traditional Garden', place: 'Imperial Palace Gardens', type: 'nature', icon: '🌸', duration: '1.5 hours' },
      { time: '16:30', title: 'Shopping District', place: 'Shibuya Crossing', type: 'shopping', icon: '🛍️', duration: '2 hours' },
      { time: '19:00', title: 'Evening Entertainment', place: 'Local Izakaya', type: 'nightlife', icon: '🍻', duration: '2 hours' }
    ];
    
    return baseActivities.filter(activity => 
      prefs.interests.some(interest => activity.type.includes(interest))
    ).slice(0, 4);
  };

  const getDayMeals = (day, prefs) => {
    return [
      { time: '08:00', type: 'Breakfast', place: 'Local Café', cuisine: 'Japanese', price: '¥800' },
      { time: '12:30', type: 'Lunch', place: 'Ramen Shop', cuisine: 'Japanese', price: '¥1,200' },
      { time: '18:30', type: 'Dinner', place: 'Traditional Restaurant', cuisine: 'Japanese', price: '¥3,500' }
    ];
  };

  const getDayTransportation = (day, prefs) => {
    return [
      { type: 'JR Pass', route: 'Tokyo Station → Asakusa', cost: 'Included', time: '25 min' },
      { type: 'Subway', route: 'Asakusa → Shibuya', cost: '¥200', time: '35 min' },
      { type: 'Walking', route: 'Local exploration', cost: 'Free', time: '15 min' }
    ];
  };

  const getDayBudget = (budgetType) => {
    const budgets = {
      budget: { total: '¥8,000', breakdown: { food: '¥3,000', activities: '¥2,000', transport: '¥1,000', misc: '¥2,000' } },
      'mid-range': { total: '¥15,000', breakdown: { food: '¥6,000', activities: '¥4,000', transport: '¥2,000', misc: '¥3,000' } },
      luxury: { total: '¥30,000', breakdown: { food: '¥12,000', activities: '¥8,000', transport: '¥3,000', misc: '¥7,000' } }
    };
    return budgets[budgetType] || budgets.budget;
  };

  const calculateEstimatedCost = (prefs) => {
    const duration = Math.ceil((new Date(prefs.endDate).getTime() - new Date(prefs.startDate).getTime()) / (1000 * 60 * 60 * 24));
    const dailyCosts = {
      budget: 8000,
      'mid-range': 15000,
      luxury: 30000
    };
    
    const dailyCost = dailyCosts[prefs.budget] || 8000;
    const totalCost = dailyCost * duration * prefs.travelers;
    
    return {
      total: totalCost,
      perPerson: dailyCost * duration,
      perDay: dailyCost,
      breakdown: {
        accommodation: Math.round(totalCost * 0.4),
        food: Math.round(totalCost * 0.3),
        activities: Math.round(totalCost * 0.2),
        transport: Math.round(totalCost * 0.1)
      }
    };
  };

  const handleContinueToESIM = () => {
    trackClick('continue_to_esim', 'plan_preview');
    navigate('/esim');
  };

  const handleSharePlan = () => {
    trackClick('share_plan', 'plan_preview');
    // Implement sharing functionality
  };

  const handleDownloadPlan = () => {
    trackClick('download_plan', 'plan_preview');
    // Implement download functionality
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Creating Your Perfect Plan</h2>
          <p className="text-gray-600">Our AI is crafting a personalized itinerary just for you...</p>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">We couldn't generate your plan. Please try again.</p>
          <button
            onClick={() => navigate('/plan')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Planning
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/plan')} 
              className="mr-4 p-2 rounded-full bg-white shadow hover:shadow-lg transition-all duration-300"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {plan.title}
              </h1>
              <p className="text-gray-600">Your personalized Japan itinerary</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownloadPlan}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Download
            </button>
            <button
              onClick={handleSharePlan}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
            >
              <Share2Icon className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>
        </div>

        {/* Plan Overview */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <CalendarIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{plan.duration}</div>
              <div className="text-gray-600">Days</div>
            </div>
            <div className="text-center">
              <UsersIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{plan.travelers}</div>
              <div className="text-gray-600">Travelers</div>
            </div>
            <div className="text-center">
              <GlobeIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{plan.interests.length}</div>
              <div className="text-gray-600">Interests</div>
            </div>
            <div className="text-center">
              <SparklesIcon className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">¥{plan.estimatedCost.perPerson.toLocaleString()}</div>
              <div className="text-gray-600">Per Person</div>
            </div>
          </div>

          {/* Highlights */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-bold mb-4">Trip Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plan.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center">
                  <StarIcon className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daily Itinerary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Daily Itinerary</h2>
              
              {/* Day Selector */}
              <div className="flex flex-wrap gap-2 mb-8">
                {plan.days.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setSelectedDay(day.day)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      selectedDay === day.day
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Day {day.day}
                  </button>
                ))}
              </div>

              {/* Selected Day Content */}
              {plan.days.filter(day => day.day === selectedDay).map((day) => (
                <div key={day.day} className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="text-xl font-bold text-gray-800">{day.title}</h3>
                    <p className="text-gray-600">{day.date}</p>
                  </div>

                  {/* Activities */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                      <MapPinIcon className="w-5 h-5 mr-2 text-blue-600" />
                      Activities
                    </h4>
                    <div className="space-y-4">
                      {day.activities.map((activity, index) => (
                        <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl mr-4">{activity.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-gray-800">{activity.title}</span>
                              <span className="text-sm text-gray-500">{activity.time}</span>
                            </div>
                            <div className="text-gray-600 text-sm mb-1">{activity.place}</div>
                            <div className="text-gray-500 text-xs">{activity.duration}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Meals */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                      <UtensilsIcon className="w-5 h-5 mr-2 text-green-600" />
                      Meals
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {day.meals.map((meal, index) => (
                        <div key={index} className="p-4 bg-green-50 rounded-lg">
                          <div className="font-semibold text-green-800">{meal.type}</div>
                          <div className="text-gray-700">{meal.place}</div>
                          <div className="text-sm text-gray-600">{meal.cuisine}</div>
                          <div className="text-sm font-semibold text-green-600">{meal.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transportation */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                      <ClockIcon className="w-5 h-5 mr-2 text-purple-600" />
                      Transportation
                    </h4>
                    <div className="space-y-3">
                      {day.transportation.map((transport, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                          <div>
                            <div className="font-semibold text-purple-800">{transport.type}</div>
                            <div className="text-sm text-gray-600">{transport.route}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-purple-600">{transport.cost}</div>
                            <div className="text-sm text-gray-500">{transport.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Daily Budget */}
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-3 text-orange-800">Daily Budget: {day.budget.total}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(day.budget.breakdown).map(([category, amount]) => (
                        <div key={category} className="text-center">
                          <div className="text-sm text-gray-600 capitalize">{category}</div>
                          <div className="font-semibold text-orange-700">{amount}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cost Breakdown */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold mb-4">Cost Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Trip Cost</span>
                  <span className="text-2xl font-bold text-blue-600">¥{plan.estimatedCost.total.toLocaleString()}</span>
                </div>
                <div className="border-t pt-4 space-y-3">
                  {Object.entries(plan.estimatedCost.breakdown).map(([category, amount]) => (
                    <div key={category} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{category}</span>
                      <span className="font-semibold">¥{amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Tips */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold mb-4">Travel Tips</h3>
              <div className="space-y-3">
                {plan.tips.map((tip, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Ready to Go?</h3>
              <p className="mb-6 text-blue-100">
                Get connected with our eSIM plans and start your adventure!
              </p>
              <button
                onClick={handleContinueToESIM}
                className="w-full bg-white text-blue-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
              >
                Choose eSIM Plan
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanPreviewPage;