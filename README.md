# Let's Get Trippin' - Japan Travel Companion

Your ultimate Japan travel companion with eSIM, AI translation, and local guides.

## 🚀 Features

- **Instant eSIM Connection** - Get connected in 60 seconds
- **AI-Powered Translation** - Real-time translation for menus and signs
- **Smart Local Guide** - Discover hidden gems and get personalized recommendations
- **Exclusive Discounts** - Save up to 50% at restaurants, attractions, and shops
- **Travel Planning** - AI-powered itinerary creation
- **Multi-language Support** - English, Japanese, Chinese, Korean

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **APIs**: Google Maps, Stripe, OpenAI, Amadeus, TripAdvisor

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/letsgettrippin.git
cd letsgettrippin

# Install dependencies
npm install

# Copy environment variables
cp env.example .env.local

# Start development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_AMADEUS_CLIENT_ID=your_amadeus_client_id_here
VITE_AMADEUS_CLIENT_SECRET=your_amadeus_client_secret_here
VITE_TRIPADVISOR_API_KEY=your_tripadvisor_api_key_here
VITE_ESIM_API_KEY=your_esim_api_key_here
VITE_GA_MEASUREMENT_ID=your_google_analytics_id_here
```

## 🚀 Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy!

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Add environment variables in Vercel dashboard

## 🌐 Domain Setup

For `letsgettrippin.com`:

1. **DNS Records**:
   ```
   Type: A
   Name: @
   Value: [Netlify/Vercel IP]
   
   Type: CNAME
   Name: www
   Value: letsgettrippin.com
   ```

2. **SSL Certificate**: Automatically provided by Netlify/Vercel

## 📱 Features

- **Responsive Design** - Works on all devices
- **Progressive Web App** - Installable on mobile
- **Offline Support** - Basic functionality without internet
- **Accessibility** - WCAG 2.1 compliant
- **Performance** - Optimized for speed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- Email: support@letsgettrippin.com
- Website: https://letsgettrippin.com
- Documentation: https://docs.letsgettrippin.com 