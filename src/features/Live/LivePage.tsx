import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Play, Users, Gift, Heart, Send, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';

export function LivePage() {
  const [activeStream, setActiveStream] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [gifts, setGifts] = useState(0);

  const streams = [
    {
      id: 1,
      user: 'Anita_Live',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anita',
      viewers: '2.4k',
      title: 'Morning Vibes & Music 🎵',
      thumbnail: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/1493a793-429f-44a1-889e-8277e6bf613e/feed-image-1-e7f5ede1-1774533579253.webp',
    },
    {
      id: 2,
      user: 'Brian_Dancer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Brian',
      viewers: '1.2k',
      title: 'Learning Amapiano Moves! 🕺',
      thumbnail: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/1493a793-429f-44a1-889e-8277e6bf613e/app-background-c28acb69-1774533574099.webp',
    }
  ];

  const handleSendGift = () => {
    setGifts(g => g + 1);
    toast.success('Gift sent! 🎁');
  };

  if (activeStream) {
    return (
      <div className="fixed inset-0 bg-black z-[100] flex flex-col">
        <div className="relative flex-1 bg-zinc-900 overflow-hidden">
          <video 
            autoPlay 
            muted 
            loop 
            className="w-full h-full object-cover opacity-80"
            src="https://assets.mixkit.co/videos/preview/mixkit-girl-dancing-in-front-of-a-neon-light-12428-large.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

          <div className="absolute top-6 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-md rounded-full pl-1 pr-4 py-1 border border-white/10">
              <img src={activeStream.avatar} className="w-8 h-8 rounded-full border border-yellow-500" alt="" />
              <div>
                <p className="text-white text-xs font-bold">{activeStream.user}</p>
                <p className="text-[10px] text-zinc-300">{activeStream.viewers} watching</p>
              </div>
              <Button size="sm" className="h-7 px-3 text-[10px] rounded-full ml-2">Follow</Button>
            </div>
            <button onClick={() => setActiveStream(null)} className="p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white">
              <X size={20} />
            </button>
          </div>

          <div className="absolute bottom-24 left-4 right-4 max-h-64 overflow-y-auto space-y-2 pointer-events-none">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start space-x-2 bg-black/20 p-2 rounded-lg backdrop-blur-[2px]">
                <span className="text-yellow-500 text-xs font-bold">User_{i}:</span>
                <span className="text-white text-xs">Amazing stream! Keep it up! 🔥</span>
              </div>
            ))}
            <div className="flex items-start space-x-2 bg-yellow-500/20 p-2 rounded-lg border border-yellow-500/20">
              <span className="text-yellow-500 text-xs font-bold">You:</span>
              <span className="text-white text-xs">Sent a gift 🎁</span>
            </div>
          </div>

          <div className="absolute bottom-6 left-4 right-4 flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input 
                placeholder="Say something..." 
                className="h-12 bg-black/40 border-white/10 pr-12 text-sm"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                <Send size={18} />
              </button>
            </div>
            <button 
              onClick={handleSendGift}
              className="w-12 h-12 flex items-center justify-center bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/30"
            >
              <Gift size={22} className="text-black" />
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-red-500/20 border border-red-500/20 rounded-full text-red-500">
              <Heart size={22} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto pt-20 pb-24 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-white">Live Streams</h2>
        <div className="flex items-center space-x-2 bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-xs font-bold border border-red-500/20">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span>842 Live</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {streams.map(stream => (
          <button 
            key={stream.id} 
            onClick={() => setActiveStream(stream)}
            className="group relative aspect-[3/4] rounded-3xl overflow-hidden border border-zinc-800 transition-transform active:scale-95"
          >
            <img src={stream.thumbnail} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            
            <div className="absolute top-3 left-3 flex items-center space-x-1 bg-red-600 px-2 py-0.5 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span>Live</span>
            </div>

            <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-bold text-white">
              <Users size={10} />
              <span>{stream.viewers}</span>
            </div>

            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white text-sm font-bold truncate mb-1">{stream.title}</p>
              <div className="flex items-center space-x-2">
                <img src={stream.avatar} className="w-5 h-5 rounded-full border border-yellow-500" alt="" />
                <span className="text-[10px] text-zinc-300 font-medium">@{stream.user}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 p-6 bg-zinc-900/50 rounded-3xl border border-dashed border-zinc-800 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4">
          <Play size={28} className="text-yellow-500 ml-1" />
        </div>
        <h3 className="text-white font-bold mb-1">Ready to shine?</h3>
        <p className="text-zinc-500 text-xs mb-4">Start your own live stream and earn gifts from your fans.</p>
        <Button className="w-full">Go Live Now</Button>
      </div>
    </div>
  );
}