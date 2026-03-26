export interface User {
  id: string;
  username: string;
  avatar: string;
  followers: number;
  following: number;
  giftsReceived: number;
  giftsSent: number;
  isVerified: boolean; // Bold username (5000+ followers + 100 KSH)
  hasBlackTick: boolean; // 10,000+ gifts received
  walletBalance: number;
  referrals: number;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  likes: number;
  comments: number;
  shares: number;
  gifts: number;
  timestamp: string;
}

export interface LiveStream {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  viewers: number;
  title: string;
  thumbnail: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  giftAmount?: number;
}