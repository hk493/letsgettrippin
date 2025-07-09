import React from 'react';
import { Twitter, MessageCircle } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  text?: string;
  url?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, text, url }) => {
  const shareUrl = url || window.location.href;
  const shareText = encodeURIComponent(`${title}${text ? ' - ' + text : ''}`);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="flex gap-2">
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
      >
        <Twitter className="w-4 h-4 mr-1" /> Twitter
      </a>
      <a
        href={lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
      >
        <MessageCircle className="w-4 h-4 mr-1" /> LINE
      </a>
    </div>
  );
};

export default ShareButtons; 