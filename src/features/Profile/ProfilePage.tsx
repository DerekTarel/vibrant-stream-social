import React from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Settings, CheckCircle2, Gift, Users, Edit3, Grid, Play, Heart, Share2, Copy } from 'lucide-react';
import { toast } from 'sonner';

export function ProfilePage() {
  const user = {
    name: 'Felix Kip',
    username: 'felix_kip',
    bio: 'Digital Creator | Music Lover 🎵 | Kenyan Vibe 🇰🇪',
    followers: '12.4k',
    following: '450',
    giftsSent: '5,240',
    giftsReceived: '12,450',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    isVerified: true,
    hasBlackTick: true,
  };

  const copyLink = () => {
    navigator.clipboard.writeText('https://dama.app/ref/felix_kip');
    toast.success('Referral link copied!');
  };

  return (
    <div className="max-w-md mx-auto pt-20 pb-24 px-4">
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-[40px] border-4 border-yellow-500 overflow-hidden shadow-2xl shadow-yellow-500/20">
            <img src={user.avatar} className="w-full h-full object-cover bg-zinc-900" alt="" />
          </div>
          {user.hasBlackTick && (
            <div className="absolute -bottom-2 -right-2 bg-black rounded-full border-2 border-yellow-500 p-1">
              <CheckCircle2 size={24} className="text-yellow-500 fill-black" />
            </div>
          )}
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <h2 className="text-2xl font-black text-white">{user.name}</h2>
            {user.isVerified && <CheckCircle2 size={18} className="text-yellow-500" />}
          </div>
          <p className="text-yellow-500 font-bold text-sm mb-3">@{user.username}</p>
          <p className="text-zinc-400 text-sm max-w-[280px] leading-relaxed mx-auto">{user.bio}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-8">
        {[
          { label: 'Followers', value: user.followers, icon: Users },
          { label: 'Following', value: user.following, icon: Heart },
          { label: 'Gifts Rcvd', value: user.giftsReceived, icon: Gift },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 flex flex-col items-center text-center">
            <stat.icon size={16} className="text-zinc-500 mb-2" />
            <span className="text-lg font-black text-white">{stat.value}</span>
            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="flex space-x-3 mb-8">
        <Button className="flex-1 h-12">
          <Edit3 size={18} className="mr-2" /> Edit Profile
        </Button>
        <button className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
          <Settings size={22} />
        </button>
      </div>

      <Card className="p-4 mb-8 border-yellow-500/20 bg-yellow-500/5">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
              <Share2 size={20} className="text-black" />
            </div>
            <div>
              <p className="text-white text-sm font-bold">Invite & Earn</p>
              <p className="text-[10px] text-zinc-500">100 invites = 10 Gifts</p>
            </div>
          </div>
          <button 
            onClick={copyLink}
            className="flex items-center space-x-1.5 text-yellow-500 text-xs font-black uppercase tracking-wider bg-black px-3 py-1.5 rounded-lg border border-yellow-500/30"
          >
            <Copy size={12} /> <span>Copy</span>
          </button>
        </div>
      </Card>

      <div className="border-t border-zinc-800">
        <div className="flex border-b border-zinc-800 mb-4">
          <button className="flex-1 py-4 flex flex-col items-center border-b-2 border-yellow-500 text-yellow-500">
            <Grid size={20} />
          </button>
          <button className="flex-1 py-4 flex flex-col items-center text-zinc-500">
            <Play size={20} />
          </button>
          <button className="flex-1 py-4 flex flex-col items-center text-zinc-500">
            <Heart size={20} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="aspect-square bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 relative">
              <img 
                src={`https://picsum.photos/seed/${i + 10}/400/400`} 
                className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" 
                alt="" 
              />
              <div className="absolute bottom-1 right-1 flex items-center space-x-1 text-[8px] font-bold text-white bg-black/40 px-1 rounded">
                <Gift size={8} /> <span>{Math.floor(Math.random() * 50)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}