import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Heart, MessageCircle, Share2, Gift, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { formatDate } from '../../lib/utils';

export const DUMMY_POSTS = [
  {
    id: 1,
    user: {
      name: 'Sarah Mwangi',
      username: 'sarah_m',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      isVerified: true,
      hasBlackTick: true,
    },
    content: 'Just reached 10k gifts! Thank you DAMA community! 💛 Africa is the future of content creation.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/1493a793-429f-44a1-889e-8277e6bf613e/feed-image-1-e7f5ede1-1774533579253.webp',
    likes: 1250,
    comments: 84,
    shares: 42,
    gifts: 156,
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: 2,
    user: {
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      isVerified: false,
      hasBlackTick: false,
    },
    content: 'Who is ready for my live stream tonight? We will be discussing the new gifting economy in Kenya. 🇰🇪',
    likes: 450,
    comments: 21,
    shares: 15,
    gifts: 24,
    timestamp: new Date(Date.now() - 7200000),
  }
];

export function PostCard({ post }: { post: any }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <Card className="mb-4 border-zinc-800">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img src={post.user.avatar} className="w-10 h-10 rounded-full border border-yellow-500" alt="" />
            {post.user.hasBlackTick && (
              <div className="absolute -bottom-1 -right-1 bg-black rounded-full border border-yellow-500 p-0.5">
                <CheckCircle2 size={10} className="text-yellow-500 fill-black" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-bold text-white text-sm">{post.user.name}</span>
              {post.user.isVerified && <CheckCircle2 size={14} className="text-yellow-500" />}
            </div>
            <span className="text-xs text-zinc-500">@{post.user.username} • {formatDate(post.timestamp)}</span>
          </div>
        </div>
        <button className="text-zinc-500"><MoreHorizontal size={20} /></button>
      </div>

      <div className="px-4 pb-3">
        <p className="text-white text-[15px] leading-relaxed">{post.content}</p>
      </div>

      {post.image && (
        <div className="aspect-square relative bg-zinc-800 overflow-hidden">
          <img src={post.image} className="w-full h-full object-cover" alt="Post content" />
        </div>
      )}

      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button 
            onClick={toggleLike}
            className={`flex items-center space-x-1.5 transition-colors ${liked ? 'text-red-500' : 'text-zinc-400'}`}
          >
            <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
            <span className="text-xs font-medium">{likesCount}</span>
          </button>
          <button className="flex items-center space-x-1.5 text-zinc-400 hover:text-white transition-colors">
            <MessageCircle size={20} />
            <span className="text-xs font-medium">{post.comments}</span>
          </button>
          <button className="flex items-center space-x-1.5 text-zinc-400 hover:text-white transition-colors">
            <Share2 size={20} />
            <span className="text-xs font-medium">{post.shares}</span>
          </button>
        </div>
        <button className="flex items-center space-x-1.5 bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-full hover:bg-yellow-500/20 transition-colors">
          <Gift size={18} />
          <span className="text-xs font-bold">{post.gifts} Gifts</span>
        </button>
      </div>
    </Card>
  );
}

export function FeedPage() {
  return (
    <div className="max-w-md mx-auto pt-20 pb-24 px-4">
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {['Trending', 'Following', 'Music', 'Sports', 'Gaming'].map((tag, i) => (
          <button 
            key={tag} 
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${i === 0 ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 'bg-zinc-900 text-zinc-400'}`}
          >
            {tag}
          </button>
        ))}
      </div>
      
      {DUMMY_POSTS.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}