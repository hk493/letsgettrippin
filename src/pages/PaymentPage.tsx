import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useInteractionTracking } from '../hooks/useAnalytics';
import { 
  CreditCardIcon, 
  ShieldCheckIcon, 
  CheckCircleIcon,
  ArrowLeftIcon,
  LockIcon,
  GlobeIcon,
  AlertCircleIcon,
  StarIcon
} from 'lucide-react';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { trackClick } = useInteractionTracking();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: user?.email || '',
    country: 'JP'
  });

  const plan = location.state?.plan;

  useEffect(() => {
    if (!plan) {
      navigate('/esim');
    }
  }, [plan, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    if (!termsAccepted) return;
    
    setProcessing(true);
    trackClick('process_payment', 'payment');
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Navigate to QR code screen
      navigate('/esim/qr', { 
        state: { 
          plan, 
          orderId: `ORD-${Date.now()}`,
          paymentMethod 
        } 
      });
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', popular: true },
    { id: 'apple', name: 'Apple Pay', icon: '🍎', popular: false },
    { id: 'google', name: 'Google Pay', icon: '🔵', popular: false },
    { id: 'paypal', name: 'PayPal', icon: '🅿️', popular: false }
  ];

  const securityFeatures = [
    'SSL encrypted checkout',
    'PCI DSS compliant',
    '3D Secure authentication',
    'Fraud protection'
  ];

  if (!plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No plan selected</h2>
          <button
            onClick={() => navigate('/esim')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Choose a Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate('/esim')} 
            className="mr-4 p-2 rounded-full bg-white shadow hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Secure Payment
            </h1>
            <p className="text-gray-600">Complete your eSIM purchase</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              {/* Payment Methods */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
                        paymentMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">{method.icon}</div>
                        <div className="text-sm font-semibold">{method.name}</div>
                        {method.popular && (
                          <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                            Popular
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12"
                      />
                      <CreditCardIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Other Payment Methods */}
              {paymentMethod !== 'card' && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">
                    {paymentMethods.find(m => m.id === paymentMethod)?.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {paymentMethods.find(m => m.id === paymentMethod)?.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You will be redirected to complete your payment securely.
                  </p>
                </div>
              )}

              {/* Billing Information */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-bold mb-4">Billing Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="JP">Japan</option>
                      <option value="US">United States</option>
                      <option value="KR">South Korea</option>
                      <option value="CN">China</option>
                      <option value="GB">United Kingdom</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mt-8 pt-8 border-t">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-300"
                  />
                  <span className="ml-3 text-gray-700">
                    I agree to the{' '}
                    <button className="text-blue-600 hover:text-blue-700 underline">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button className="text-blue-600 hover:text-blue-700 underline">
                      Privacy Policy
                    </button>
                  </span>
                </label>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={!termsAccepted || processing}
                className={`w-full mt-8 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center ${
                  termsAccepted && !processing
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105 shadow-xl hover:shadow-2xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-3"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <LockIcon className="w-5 h-5 mr-2" />
                    Pay ¥{plan.price.toLocaleString()}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Plan Summary */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mr-4`}>
                    <StarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{plan.name} Plan</h4>
                    <p className="text-gray-600 text-sm">{plan.duration} • {plan.data}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan Price</span>
                    <span className="line-through text-gray-500">¥{plan.originalPrice?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">-¥{((plan.originalPrice || plan.price) - plan.price).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-blue-600">¥{plan.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="text-center">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Save ¥{((plan.originalPrice || plan.price) - plan.price).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <ShieldCheckIcon className="w-5 h-5 text-green-600 mr-2" />
                Secure Payment
              </h3>
              <div className="space-y-3">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Need Help?</h3>
              <p className="text-blue-100 mb-4 text-sm">
                Our support team is available 24/7 to assist you with your purchase.
              </p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Support
              </button>
            </div>

            {/* Money Back Guarantee */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center mb-3">
                <CheckCircleIcon className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="font-bold text-green-800">30-Day Money Back Guarantee</h3>
              </div>
              <p className="text-green-700 text-sm">
                Not satisfied? Get a full refund within 30 days of purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;