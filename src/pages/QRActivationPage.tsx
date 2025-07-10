import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useInteractionTracking } from '../hooks/useAnalytics';
import { issueEsim } from '../utils/esimApi';
import { 
  QrCodeIcon, 
  CheckCircleIcon, 
  DownloadIcon, 
  CopyIcon,
  SmartphoneIcon,
  ArrowRightIcon,
  AlertCircleIcon,
  RefreshCwIcon,
  HelpCircleIcon
} from 'lucide-react';

const QRActivationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { trackClick } = useInteractionTracking();
  
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const { plan, orderId, paymentMethod } = location.state || {};

  useEffect(() => {
    if (!plan || !orderId) {
      navigate('/esim');
      return;
    }
    
    generateQRCode();
  }, [plan, orderId]);

  const generateQRCode = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate eSIM API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock QR code data
      const mockQRData = {
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=LPA:1$rsp-prod.oberthur.net$04386-AGYFT-A74Y8-3F815`,
        activationCode: 'LPA:1$rsp-prod.oberthur.net$04386-AGYFT-A74Y8-3F815',
        iccid: '8944501234567890123',
        networkInfo: {
          carrier: 'NTT Docomo',
          network: '4G/5G',
          coverage: 'Nationwide Japan'
        }
      };
      
      setQrCode(mockQRData);
      trackClick('qr_code_generated', 'qr_activation');
    } catch (err) {
      setError('Failed to generate eSIM. Please try again.');
      console.error('eSIM generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (qrCode?.activationCode) {
      navigator.clipboard.writeText(qrCode.activationCode);
      setCopied(true);
      trackClick('copy_activation_code', 'qr_activation');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadQR = () => {
    if (qrCode?.qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCode.qrCodeUrl;
      link.download = `esim-qr-${orderId}.png`;
      link.click();
      trackClick('download_qr_code', 'qr_activation');
    }
  };

  const handleGoToDashboard = () => {
    trackClick('go_to_dashboard', 'qr_activation');
    navigate('/dashboard');
  };

  const activationSteps = [
    {
      step: 1,
      title: 'Open Settings',
      description: 'Go to Settings > Cellular/Mobile Data',
      icon: <SmartphoneIcon className="w-6 h-6" />,
      details: [
        'Open your device Settings app',
        'Look for "Cellular" or "Mobile Data"',
        'Tap on it to continue'
      ]
    },
    {
      step: 2,
      title: 'Add eSIM',
      description: 'Tap "Add Cellular Plan" or "Add eSIM"',
      icon: <QrCodeIcon className="w-6 h-6" />,
      details: [
        'Look for "Add Cellular Plan" or "Add eSIM"',
        'Tap on this option',
        'Your camera will open automatically'
      ]
    },
    {
      step: 3,
      title: 'Scan QR Code',
      description: 'Point your camera at the QR code below',
      icon: <CheckCircleIcon className="w-6 h-6" />,
      details: [
        'Hold your device steady',
        'Point the camera at the QR code',
        'Wait for automatic detection'
      ]
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Generating Your eSIM</h2>
          <p className="text-gray-600">Please wait while we prepare your connection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={generateQRCode}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <RefreshCwIcon className="w-5 h-5 mr-2" />
              Try Again
            </button>
            <button
              onClick={() => navigate('/esim')}
              className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Plans
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg mb-8">
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
          
          <div className="flex items-center justify-center mb-6">
            <CheckCircleIcon className="w-16 h-16 text-green-500" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your eSIM is Ready!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scan the QR code below to activate your eSIM and get connected in Japan
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* QR Code Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Activation QR Code</h2>
              <p className="text-gray-600">Scan this code with your device to activate your eSIM</p>
            </div>

            {/* QR Code */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <div className="text-center">
                <img
                  src={qrCode?.qrCodeUrl}
                  alt="eSIM Activation QR Code"
                  className="w-64 h-64 mx-auto mb-6 border-4 border-white rounded-lg shadow-lg"
                />
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <CopyIcon className="w-5 h-5 mr-2" />
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                  <button
                    onClick={handleDownloadQR}
                    className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <DownloadIcon className="w-5 h-5 mr-2" />
                    Download QR
                  </button>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-bold text-blue-800 mb-4">Order Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Order ID:</p>
                  <p className="font-semibold">{orderId}</p>
                </div>
                <div>
                  <p className="text-gray-600">Plan:</p>
                  <p className="font-semibold">{plan?.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Duration:</p>
                  <p className="font-semibold">{plan?.duration}</p>
                </div>
                <div>
                  <p className="text-gray-600">Data:</p>
                  <p className="font-semibold">{plan?.data}</p>
                </div>
                <div>
                  <p className="text-gray-600">Network:</p>
                  <p className="font-semibold">{qrCode?.networkInfo?.carrier}</p>
                </div>
                <div>
                  <p className="text-gray-600">Coverage:</p>
                  <p className="font-semibold">{qrCode?.networkInfo?.coverage}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Activation Instructions</h2>
              
              {/* Step Progress */}
              <div className="flex items-center justify-between mb-8">
                {activationSteps.map((step, index) => (
                  <div key={step.step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      currentStep >= step.step
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                      {currentStep > step.step ? (
                        <CheckCircleIcon className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-bold">{step.step}</span>
                      )}
                    </div>
                    {index < activationSteps.length - 1 && (
                      <div className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                        currentStep > step.step ? 'bg-blue-600' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Current Step Details */}
              <div className="space-y-6">
                {activationSteps.map((step) => (
                  <div
                    key={step.step}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      currentStep === step.step
                        ? 'border-blue-500 bg-blue-50'
                        : currentStep > step.step
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`p-3 rounded-lg mr-4 ${
                        currentStep === step.step
                          ? 'bg-blue-100 text-blue-600'
                          : currentStep > step.step
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        <ul className="space-y-2">
                          {step.details.map((detail, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-700">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Step Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                  disabled={currentStep === 3}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    currentStep === 3
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <HelpCircleIcon className="w-6 h-6 text-orange-600 mr-2" />
                <h3 className="font-bold text-orange-800">Need Help?</h3>
              </div>
              <p className="text-orange-700 text-sm mb-4">
                Having trouble activating your eSIM? Our support team is here to help 24/7.
              </p>
              <div className="space-y-2">
                <button className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                  Contact Support
                </button>
                <button className="w-full bg-white text-orange-600 border border-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors text-sm">
                  View FAQ
                </button>
              </div>
            </div>

            {/* Success Actions */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">All Set?</h3>
              <p className="text-blue-100 mb-6">
                Once your eSIM is activated, you can manage your connection and view usage in your dashboard.
              </p>
              <button
                onClick={handleGoToDashboard}
                className="w-full bg-white text-blue-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Go to Dashboard
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRActivationPage;