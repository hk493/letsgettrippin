import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useInteractionTracking } from '../hooks/useAnalytics';
import { fetchReviews, postReview } from '../utils/review';
import { 
  StarIcon, 
  SendIcon, 
  HeartIcon,
  ThumbsUpIcon,
  FilterIcon,
  TrendingUpIcon,
  UsersIcon,
  MapPinIcon,
  CalendarIcon
} from 'lucide-react';

const ReviewsPage: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { trackClick } = useInteractionTracking();
  
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    tripType: '',
    destination: '',
    planUsed: ''
  });

  const mockReviews = [
    {
      id: '1',
      user: 'Sarah Kim',
      country: '🇰🇷 Seoul',
      avatar: '👩‍💼',
      rating: 5,
      title: 'Perfect for my Tokyo adventure!',
      comment: 'The eSIM worked flawlessly throughout my entire trip. Setup was incredibly easy and the connection was fast everywhere I went. Saved me so much money compared to roaming charges!',
      date: '2024-01-15',
      planUsed: 'Adventurer',
      destination: 'Tokyo',
      tripType: 'Leisure',
      helpful: 24,
      verified: true,
      photos: ['tokyo1.jpg', 'tokyo2.jpg']
    },
    {
      id: '2',
      user: 'Mike Johnson',
      country: '🇺🇸 California',
      avatar: '👨‍💻',
      rating: 5,
      title: 'Excellent for business travel',
      comment: 'Used this for a 2-week business trip across Japan. The connection was reliable even in remote areas. The AI translation feature was a lifesaver during meetings!',
      date: '2024-01-12',
      planUsed: 'Digital Nomad',
      destination: 'Multiple cities',
      tripType: 'Business',
      helpful: 18,
      verified: true,
      photos: []
    },
    {
      id: '3',
      user: 'Emma Wilson',
      country: '🇬🇧 London',
      avatar: '👩‍🎓',
      rating: 4,
      title: 'Great value for money',
      comment: 'Perfect for my weekend trip to Tokyo. Activated instantly at the airport and worked great throughout the city. Only minor issue was slower speeds in some subway stations.',
      date: '2024-01-10',
      planUsed: 'Explorer',
      destination: 'Tokyo',
      tripType: 'Weekend Trip',
      helpful: 12,
      verified: true,
      photos: ['weekend1.jpg']
    },
    {
      id: '4',
      user: 'Chen Wei',
      country: '🇹🇼 Taipei',
      avatar: '👨‍🎨',
      rating: 5,
      title: 'Amazing cultural experience',
      comment: 'The local guide recommendations were spot on! Found amazing hidden restaurants and cultural sites I never would have discovered otherwise. The eSIM connection was perfect for sharing my journey on social media.',
      date: '2024-01-08',
      planUsed: 'Adventurer',
      destination: 'Kyoto',
      tripType: 'Cultural',
      helpful: 31,
      verified: true,
      photos: ['kyoto1.jpg', 'kyoto2.jpg', 'kyoto3.jpg']
    },
    {
      id: '5',
      user: 'Maria Santos',
      country: '🇧🇷 São Paulo',
      avatar: '👩‍🍳',
      rating: 5,
      title: 'Foodie paradise made easy',
      comment: 'The restaurant recommendations and menu translation features made my food tour incredible! Tried so many authentic places I never would have found. Connection was fast for uploading all my food photos!',
      date: '2024-01-05',
      planUsed: 'Adventurer',
      destination: 'Osaka',
      tripType: 'Food Tour',
      helpful: 27,
      verified: true,
      photos: ['food1.jpg', 'food2.jpg']
    }
  ];

  const stats = {
    totalReviews: 2847,
    averageRating: 4.8,
    fiveStars: 78,
    fourStars: 18,
    threeStars: 3,
    twoStars: 1,
    oneStars: 0
  };

  useEffect(() => {
    loadReviews();
  }, [filter, sortBy]);

  const loadReviews = async () => {
    setLoading(true);
    try {
      // In production, use: const data = await fetchReviews({ filter, sortBy });
      await new Promise(resolve => setTimeout(resolve, 1000));
      setReviews(mockReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) return;
    
    setSubmitting(true);
    trackClick('submit_review', 'reviews');
    
    try {
      // In production, use: await postReview(newReview);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add new review to the list
      const review = {
        id: Date.now().toString(),
        user: user.name || 'Anonymous',
        country: '🌍 Traveler',
        avatar: '👤',
        ...newReview,
        date: new Date().toISOString().split('T')[0],
        helpful: 0,
        verified: true,
        photos: []
      };
      
      setReviews(prev => [review, ...prev]);
      setNewReview({
        rating: 5,
        title: '',
        comment: '',
        tripType: '',
        destination: '',
        planUsed: ''
      });
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleHelpful = (reviewId) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
    trackClick('mark_helpful', 'reviews');
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true;
    if (filter === 'verified') return review.verified;
    if (filter === 'photos') return review.photos.length > 0;
    return review.rating === parseInt(filter);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

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
            Traveler Reviews
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from real travelers who used DataPocket for their Japan adventures
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <TrendingUpIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800 mb-1">{stats.averageRating}</div>
            <div className="text-gray-600">Average Rating</div>
            <div className="flex justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <UsersIcon className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800 mb-1">{stats.totalReviews.toLocaleString()}</div>
            <div className="text-gray-600">Total Reviews</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <HeartIcon className="w-8 h-8 text-red-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800 mb-1">{stats.fiveStars}%</div>
            <div className="text-gray-600">5-Star Reviews</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <ThumbsUpIcon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800 mb-1">98%</div>
            <div className="text-gray-600">Recommend Rate</div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Rating Distribution</h2>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const percentage = stats[`${['', 'one', 'two', 'three', 'four', 'five'][rating]}Stars`];
              return (
                <div key={rating} className="flex items-center">
                  <div className="flex items-center w-20">
                    <span className="text-sm font-medium mr-2">{rating}</span>
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters and Sort */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FilterIcon className="w-5 h-5 text-gray-600" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Reviews</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="verified">Verified Only</option>
                    <option value="photos">With Photos</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="highest">Highest Rating</option>
                    <option value="lowest">Lowest Rating</option>
                    <option value="helpful">Most Helpful</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reviews */}
            {loading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/6"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {sortedReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="text-4xl mr-4">{review.avatar}</div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-bold text-gray-800 mr-2">{review.user}</h3>
                            {review.verified && (
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                                Verified
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">{review.country}</p>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                            <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-lg mb-2">{review.title}</h4>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>

                    {/* Trip Details */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                        <MapPinIcon className="w-4 h-4 text-gray-600 mr-1" />
                        <span>{review.destination}</span>
                      </div>
                      <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                        <CalendarIcon className="w-4 h-4 text-gray-600 mr-1" />
                        <span>{review.tripType}</span>
                      </div>
                      <div className="flex items-center bg-blue-100 rounded-full px-3 py-1">
                        <span className="text-blue-800 font-semibold">{review.planUsed} Plan</span>
                      </div>
                    </div>

                    {/* Photos */}
                    {review.photos.length > 0 && (
                      <div className="flex space-x-2 mb-4">
                        {review.photos.slice(0, 3).map((photo, index) => (
                          <div key={index} className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500 text-xs">📷</span>
                          </div>
                        ))}
                        {review.photos.length > 3 && (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500 text-xs">+{review.photos.length - 3}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <button
                        onClick={() => handleHelpful(review.id)}
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <ThumbsUpIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm">Helpful ({review.helpful})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Write Review Sidebar */}
          <div className="space-y-6">
            {user ? (
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h2 className="text-xl font-bold mb-6">Share Your Experience</h2>
                
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Overall Rating
                    </label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                          className="focus:outline-none"
                        >
                          <StarIcon 
                            className={`w-8 h-8 ${rating <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Review Title
                    </label>
                    <input
                      type="text"
                      value={newReview.title}
                      onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Summarize your experience"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                      placeholder="Tell us about your experience with DataPocket..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Trip Details */}
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Destination
                      </label>
                      <input
                        type="text"
                        value={newReview.destination}
                        onChange={(e) => setNewReview(prev => ({ ...prev, destination: e.target.value }))}
                        placeholder="e.g., Tokyo, Kyoto"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Trip Type
                      </label>
                      <select
                        value={newReview.tripType}
                        onChange={(e) => setNewReview(prev => ({ ...prev, tripType: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select trip type</option>
                        <option value="Leisure">Leisure</option>
                        <option value="Business">Business</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Food Tour">Food Tour</option>
                        <option value="Weekend Trip">Weekend Trip</option>
                        <option value="Family">Family</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plan Used
                      </label>
                      <select
                        value={newReview.planUsed}
                        onChange={(e) => setNewReview(prev => ({ ...prev, planUsed: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select plan</option>
                        <option value="Explorer">Explorer</option>
                        <option value="Adventurer">Adventurer</option>
                        <option value="Digital Nomad">Digital Nomad</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting || !newReview.title || !newReview.comment}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                      submitting || !newReview.title || !newReview.comment
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105'
                    }`}
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <SendIcon className="w-5 h-5 mr-2" />
                        Submit Review
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-xl p-6 text-center">
                <h3 className="text-lg font-bold mb-4">Share Your Experience</h3>
                <p className="text-gray-600 mb-6">Sign in to write a review and help other travelers</p>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Sign In to Review
                </button>
              </div>
            )}

            {/* Review Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-bold text-blue-800 mb-4">Review Guidelines</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Be honest and specific about your experience
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Focus on the service and your trip experience
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Keep it respectful and constructive
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Include details that would help other travelers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;