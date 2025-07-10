import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { StarIcon, QuoteIcon, ArrowRightIcon } from 'lucide-react'
import { Button } from './Button'

export const TestimonialsSection = ({ onGetStarted }) => {
  const { t } = useLanguage()

  const testimonials = [
    { name: 'Sarah Chen', country: 'Taiwan', flag: '🇹🇼', rating: 5, text: t('testimonial1'), trip: '7 days in Tokyo' },
    { name: 'Mike Johnson', country: 'USA', flag: '🇺🇸', rating: 5, text: t('testimonial2'), trip: '2 weeks across Japan' },
    { name: '김민수', country: 'South Korea', flag: '🇰🇷', rating: 5, text: t('testimonial3'), trip: '5 days in Osaka' }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-pink-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-8xl floating-animation">🌸</div>
        <div className="absolute bottom-20 right-10 text-6xl floating-animation" style={{ animationDelay: '3s' }}>⛩️</div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            {t('testimonialsTitle') || 'What travelers say about us'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('testimonialsSubtitle') || 'Join thousands of happy customers'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-xl relative group hover:scale-105 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
                <QuoteIcon className="w-4 h-4 text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <span className="mr-2">{testimonial.flag}</span>
                    {testimonial.country}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {testimonial.trip}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">50K+</div>
              <div className="text-sm text-gray-600">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">4.9★</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
          
          {/* Get eSIM Button */}
          <Button onClick={onGetStarted}>{t('aiTravelPlannerButton')}</Button>
        </div>
      </div>
    </section>
  )
}