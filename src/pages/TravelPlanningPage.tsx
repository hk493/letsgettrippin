import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useInteractionTracking } from '../hooks/useAnalytics';
import PlaceAutocomplete from '../components/PlaceAutocomplete';
import { 
  MapPinIcon, 
  CalendarIcon, 
  UsersIcon, 
  HeartIcon,
  CameraIcon,
  UtensilsIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon,
  SparklesIcon,
  ClockIcon
} from 'lucide-react';

interface TravelPreferences {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: string;
  interests: string[];
  travelStyle: string;
  accommodation: string;
}

const TravelPlanningPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { trackClick } = useInteractionTracking();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [preferences, setPreferences] = useState<TravelPreferences>({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: '',
    interests: [],
    travelStyle: '',
    accommodation: ''
  });

  const totalSteps = 6;

  const budgetOptions = [
    { value: 'budget', label: 'Budget (¥5,000-10,000/day)', icon: '💰', description: 'Hostels, local food, public transport' },
    { value: 'mid-range', label: 'Mid-range (¥10,000-20,000/day)', icon: '🏨', description: 'Hotels, mix of dining, some activities' },
    { value: 'luxury', label: 'Luxury (¥20,000+/day)', icon: '✨', description: 'Premium hotels, fine dining, private tours' }
  ];

  const interestOptions = [
    { value: 'culture', label: 'Culture & History', icon: '⛩️' },
    { value: 'food', label: 'Food & Dining', icon: '🍜' },
    { value: 'nature', label: 'Nature & Outdoors', icon: '🌸' },
    { value: 'shopping', label: 'Shopping', icon: '🛍️' },
    { value: 'nightlife', label: 'Nightlife', icon: '🌃' },
    { value: 'art', label: 'Art & Museums', icon: '🎨' },
    { value: 'technology', label: 'Technology', icon: '🤖' },
    { value: 'anime', label: 'Anime & Manga', icon: '📺' }
  ];

  const travelStyleOptions = [
    { value: 'relaxed', label: 'Relaxed Explorer', icon: '🧘', description: 'Take it slow, enjoy the moment' },
    { value: 'adventurous', label: 'Adventure Seeker', icon: '🏔️', description: 'Pack in as much as possible' },
    { value: 'cultural', label: 'Cultural Immersion', icon: '🎭', description: 'Deep dive into local culture' },
    { value: 'foodie', label: 'Foodie Journey', icon: '🍱', description: 'Culinary experiences first' }
  ];

  const accommodationOptions = [
    { value: 'hostel', label: 'Hostels', icon: '🏠', description: 'Budget-friendly, social atmosphere' },
    { value: 'hotel', label: 'Hotels', icon: '🏨', description: 'Comfortable, reliable service' },
    { value: 'ryokan', label: 'Traditional Ryokan', icon: '🏯', description: 'Authentic Japanese experience' },
    { value: 'airbnb', label: 'Apartments', icon: '🏡', description: 'Local living experience' }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      trackClick(`step_${currentStep}_next`, 'travel_planning');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    trackClick('generate_plan', 'travel_planning');
    
    // Simulate AI plan generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Navigate to plan preview with preferences
    navigate('/plan/preview', { state: { preferences } });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return preferences.destination.length > 0;
      case 2: return preferences.startDate && preferences.endDate;
      case 3: return preferences.travelers > 0;
      case 4: return preferences.budget.length > 0;
      case 5: return preferences.interests.length > 0;
      case 6: return preferences.travelStyle && preferences.accommodation;
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <MapPinIcon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Where would you like to go?</h2>
              <p className="text-gray-600 text-lg">Choose your destination in Japan</p>
            </div>
            
            <div className="max-w-md mx-auto">
              <PlaceAutocomplete
                placeholder="Search for cities, landmarks, or regions..."
                onSelect={(place) => setPreferences(prev => ({ ...prev, destination: place.description }))}
                language="en"
              />
              
              {preferences.destination && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-blue-800 font-medium">{preferences.destination}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Popular Destinations */}
            <div className="mt-12">
              <h3 className="text-lg font-semibold mb-6 text-center">Popular Destinations</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima'].map((city) => (
                  <button
                    key={city}
                    onClick={() => setPreferences(prev => ({ ...prev, destination: city }))}
                    className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="text-2xl mb-2">
                      {city === 'Tokyo' && '🗼'}
                      {city === 'Kyoto' && '⛩️'}
                      {city === 'Osaka' && '🏯'}
                      {city === 'Hiroshima' && '🕊️'}
                    </div>
                    <div className="font-medium">{city}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <CalendarIcon className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">When are you traveling?</h2>
              <p className="text-gray-600 text-lg">Select your travel dates</p>
            </div>
            
            <div className="max-w-md mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Date
                </label>
                <input
                  type="date"
                  value={preferences.startDate}
                  onChange={(e) => setPreferences(prev => ({ ...prev, startDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Date
                </label>
                <input
                  type="date"
                  value={preferences.endDate}
                  onChange={(e) => setPreferences(prev => ({ ...prev, endDate: e.target.value }))}
                  min={preferences.startDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {preferences.startDate && preferences.endDate && (
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-center">
                    <ClockIcon className="w-5 h-5 text-purple-500 mr-2" />
                    <span className="text-purple-800 font-medium">
                      {Math.ceil((new Date(preferences.endDate).getTime() - new Date(preferences.startDate).getTime()) / (1000 * 60 * 60 * 24))} days trip
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <UsersIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">How many travelers?</h2>
              <p className="text-gray-600 text-lg">Select the number of people in your group</p>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-8">
                <button
                  onClick={() => setPreferences(prev => ({ ...prev, travelers: Math.max(1, prev.travelers - 1) }))}
                  className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-2xl font-bold"
                >
                  -
                </button>
                <div className="text-center">
                  <div className="text-6xl font-bold text-gray-800 mb-2">
                    {preferences.travelers}
                  </div>
                  <div className="text-gray-600">
                    {preferences.travelers === 1 ? 'traveler' : 'travelers'}
                  </div>
                </div>
                <button
                  onClick={() => setPreferences(prev => ({ ...prev, travelers: prev.travelers + 1 }))}
                  className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-2xl font-bold"
                >
                  +
                </button>
              </div>

              {/* Group Type Suggestions */}
              <div className="mt-12 grid grid-cols-1 gap-4">
                {[
                  { count: 1, label: 'Solo Adventure', icon: '🎒' },
                  { count: 2, label: 'Couple\'s Trip', icon: '💕' },
                  { count: 4, label: 'Family Fun', icon: '👨‍👩‍👧‍👦' },
                  { count: 6, label: 'Friends Group', icon: '👥' }
                ].map((option) => (
                  <button
                    key={option.count}
                    onClick={() => setPreferences(prev => ({ ...prev, travelers: option.count }))}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      preferences.travelers === option.count
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{option.icon}</span>
                      <div className="text-left">
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.count} {option.count === 1 ? 'person' : 'people'}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="text-6xl mb-4">💰</div>
              <h2 className="text-3xl font-bold mb-4">What&apos;s your budget?</h2>
              <p className="text-gray-600 text-lg">Choose your daily spending range</p>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-4">
              {budgetOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setPreferences(prev => ({ ...prev, budget: option.value }))}
                  className={`w-full p-6 rounded-lg border-2 transition-all duration-300 text-left ${
                    preferences.budget === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">{option.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{option.label}</div>
                      <div className="text-gray-600 text-sm">{option.description}</div>
                    </div>
                    {preferences.budget === option.value && (
                      <CheckIcon className="w-6 h-6 text-blue-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <HeartIcon className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">What interests you?</h2>
              <p className="text-gray-600 text-lg">Select all that apply (choose at least one)</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {interestOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleInterestToggle(option.value)}
                    className={`p-6 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                      preferences.interests.includes(option.value)
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{option.icon}</div>
                      <div className="font-semibold">{option.label}</div>
                      {preferences.interests.includes(option.value) && (
                        <CheckIcon className="w-5 h-5 text-red-500 mx-auto mt-2" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <span className="text-sm text-gray-600">
                  Selected: {preferences.interests.length} interest{preferences.interests.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <SparklesIcon className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Final touches</h2>
              <p className="text-gray-600 text-lg">Tell us about your travel style and accommodation preference</p>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-8">
              {/* Travel Style */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Travel Style</h3>
                <div className="space-y-3">
                  {travelStyleOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setPreferences(prev => ({ ...prev, travelStyle: option.value }))}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                        preferences.travelStyle === option.value
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{option.icon}</span>
                        <div className="flex-1">
                          <div className="font-semibold">{option.label}</div>
                          <div className="text-gray-600 text-sm">{option.description}</div>
                        </div>
                        {preferences.travelStyle === option.value && (
                          <CheckIcon className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accommodation */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Accommodation Preference</h3>
                <div className="space-y-3">
                  {accommodationOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setPreferences(prev => ({ ...prev, accommodation: option.value }))}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                        preferences.accommodation === option.value
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{option.icon}</span>
                        <div className="flex-1">
                          <div className="font-semibold">{option.label}</div>
                          <div className="text-gray-600 text-sm">{option.description}</div>
                        </div>
                        {preferences.accommodation === option.value && (
                          <CheckIcon className="w-5 h-5 text-purple-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        {/* Progress Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <img 
                src="/trippin-logo.png" 
                alt="Trippin" 
                className="w-12 h-12 mr-3"
                onError={(e) => {
                  e.currentTarget.src = "/trippin-logo.png";
                }}
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trippin
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  step <= currentStep
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {step < currentStep ? (
                  <CheckIcon className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{step}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleGeneratePlan}
                disabled={!canProceed() || isGenerating}
                className={`flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  canProceed() && !isGenerating
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Generating Plan...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    Generate My Plan
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPlanningPage;