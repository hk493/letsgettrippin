import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlaceAutocomplete from '../components/PlaceAutocomplete';
import { 
  MapPinIcon, 
  CalendarIcon, 
  UsersIcon, 
  WifiIcon, 
  CreditCardIcon, 
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  StarIcon
} from 'lucide-react';

interface Plan {
  id: number;
  name: string;
  duration: string;
  data: string;
  price: number;
  features: string[];
  popular: boolean;
  color: string;
}

interface FormData {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  selectedPlan: Plan | null;
  selectedPlaces: string[];
}

const PlanningFlow: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    selectedPlan: null,
    selectedPlaces: []
  });

  const plans: Plan[] = [
    {
      id: 1,
      name: "Explorer",
      duration: "3 Days",
      data: "1GB",
      price: 980,
      features: ["eSIM Connection", "Basic Translation", "Local Spots", "Standard Support"],
      popular: false,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Adventurer", 
      duration: "7 Days",
      data: "3GB",
      price: 1980,
      features: ["Everything in Explorer", "AI Translation", "AR Navigation", "Premium Coupons", "Priority Support"],
      popular: true,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      name: "Nomad",
      duration: "30 Days", 
      data: "10GB",
      price: 3980,
      features: ["Everything in Adventurer", "Unlimited Translation", "Personal Travel AI", "VIP Discounts", "24/7 Concierge"],
      popular: false,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const steps = [
    { id: 1, title: "Destination", icon: MapPinIcon },
    { id: 2, title: "Dates", icon: CalendarIcon },
    { id: 3, title: "Travelers", icon: UsersIcon },
    { id: 4, title: "eSIM Plan", icon: WifiIcon },
    { id: 5, title: "Payment", icon: CreditCardIcon }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceSelect = (place: { description: string; place_id: string }) => {
    setFormData({ ...formData, destination: place.description });
  };

  const handlePlanSelect = (plan: Plan) => {
    setFormData({ ...formData, selectedPlan: plan });
  };

  const handleSubmit = () => {
    // Handle form submission
    navigate('/payment', { state: { formData } });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Let&apos;s Get Trippin&apos;!
              </h2>
              <p className="text-gray-600 text-lg">
                Let&apos;s start planning your perfect Japan adventure
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <PlaceAutocomplete
                placeholder="Search for cities, landmarks, or addresses..."
                onSelect={handlePlaceSelect}
                language="en"
              />
              {formData.destination && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-blue-800 font-medium">{formData.destination}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                When are you traveling?
              </h2>
              <p className="text-gray-600 text-lg">
                Choose your travel dates
              </p>
            </div>
            
            <div className="max-w-md mx-auto space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                How many travelers?
              </h2>
              <p className="text-gray-600 text-lg">
                Select the number of people in your group
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setFormData({ ...formData, travelers: Math.max(1, formData.travelers - 1) })}
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  -
                </button>
                <span className="text-4xl font-bold text-gray-800 w-16 text-center">
                  {formData.travelers}
                </span>
                <button
                  onClick={() => setFormData({ ...formData, travelers: formData.travelers + 1 })}
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
              <p className="text-center text-gray-600 mt-4">
                {formData.travelers} {formData.travelers === 1 ? 'traveler' : 'travelers'}
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Choose your eSIM plan
              </h2>
              <p className="text-gray-600 text-lg">
                Select the perfect plan for your journey
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 cursor-pointer ${
                    formData.selectedPlan?.id === plan.id 
                      ? 'border-blue-500 shadow-blue-100' 
                      : 'border-gray-100'
                  }`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center">
                      <StarIcon size={12} className="mr-1" />
                      POPULAR
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold mb-2">¥{plan.price.toLocaleString()}</div>
                    <p className="text-gray-600">{plan.duration} • {plan.data}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckIcon className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`w-full py-3 px-4 rounded-lg text-center font-semibold transition-all duration-300 ${
                    formData.selectedPlan?.id === plan.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {formData.selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Review your plan
              </h2>
              <p className="text-gray-600 text-lg">
                Confirm your travel details before payment
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Destination:</span>
                    <span className="font-semibold">{formData.destination}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Dates:</span>
                    <span className="font-semibold">{formData.startDate} - {formData.endDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Travelers:</span>
                    <span className="font-semibold">{formData.travelers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">eSIM Plan:</span>
                    <span className="font-semibold">{formData.selectedPlan?.name}</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">¥{formData.selectedPlan?.price?.toLocaleString()}</span>
                  </div>
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
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <CheckIcon className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                    currentStep > step.id ? 'bg-blue-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <span
                key={step.id}
                className={`text-sm font-medium transition-all duration-300 ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center"
            >
              Next
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center"
            >
              Proceed to Payment
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanningFlow;