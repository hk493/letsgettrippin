import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Star, Loader2, AlertCircle, Send } from 'lucide-react';
import { fetchReviews, postReview } from '../utils/review';

interface Review {
  id: string;
  user: string;
  comment: string;
  rating: number;
  date: string;
}

const ReviewPage: React.FC = () => {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // 本番API: fetchReviews().then(setReviews).catch(setError).finally(() => setLoading(false));
    fetchReviews()
      .then(data => setReviews(data))
      .catch(e => setError(e.message || 'レビュー取得に失敗しました'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      // 本番API: await postReview({ comment, rating })
      await postReview({ comment, rating });
      const newReviews = await fetchReviews();
      setReviews(newReviews);
      setComment('');
      setRating(5);
      if (typeof window !== 'undefined' && 'gtag' in window) {
        const gtag = (window as { gtag: (...args: unknown[]) => void }).gtag;
        gtag('event', 'review_submitted', {
          rating,
          comment_length: comment.length
        });
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : '投稿に失敗しました';
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('review.title')}</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 max-w-lg mx-auto mb-8 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold">{t('review.your_rating')}</span>
          {[1,2,3,4,5].map(n => (
            <Star key={n} className={`w-6 h-6 cursor-pointer ${n <= rating ? 'text-yellow-400' : 'text-gray-300'}`} onClick={() => setRating(n)} fill={n <= rating ? '#facc15' : 'none'} />
          ))}
        </div>
        <textarea
          className="border rounded p-2 w-full min-h-[80px]"
          placeholder={t('review.placeholder')}
          value={comment}
          onChange={e => setComment(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`flex items-center justify-center px-6 py-3 rounded-full text-white font-bold text-lg ${submitting ? 'bg-gray-300' : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500'}`}
          disabled={submitting || !comment}
        >
          {submitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />} {t('review.submit')}
        </button>
        {error && <div className="text-red-500 mt-2 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{error}</div>}
      </form>
      <div className="max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">{t('review.latest')}</h2>
        {loading ? (
          <div className="flex flex-col items-center py-8">
            <Loader2 className="w-10 h-10 animate-spin mb-2 text-blue-500" />
            <div>{t('review.loading')}</div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-gray-500 py-8">{t('review.no_reviews')}</div>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map(r => (
              <div key={r.id} className="bg-white rounded-xl shadow p-4 flex flex-col gap-1 animate-fade-in">
                <div className="flex items-center gap-2 mb-1">
                  {[1,2,3,4,5].map(n => (
                    <Star key={n} className={`w-4 h-4 ${n <= r.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill={n <= r.rating ? '#facc15' : 'none'} />
                  ))}
                  <span className="text-xs text-gray-400 ml-2">{r.date}</span>
                </div>
                <div className="font-bold text-blue-600">{r.user}</div>
                <div className="text-gray-700">{r.comment}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewPage; 