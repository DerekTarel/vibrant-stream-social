import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Send, Gift, Image as ImageIcon, Camera, Smile, ChevronLeft, MoreVertical, Shield, MessageCircle } from 'lucide-react';

export function InboxPage() {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [msg, setMsg] = useState('');

  const chats = [
    {
      id: 1,
      user: 'Sarah Mwangi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      lastMsg: 'Thanks for the gift! You are awesome!',
      time: '2m',
      unread: 1,
      online: true,
    },
    {
      id: 2,
      user: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      lastMsg: 'Will you join the stream at 8 PM?',
      time: '1h',
      unread: 0,
      online: false,
    }
  ];

  if (selectedChat) {
    return (
      <div className="fixed inset-0 bg-black z-[60] flex flex-col pt-4">
        <header className="px-4 py-3 flex items-center justify-between border-b border-zinc-800 bg-black">
          <div className="flex items-center space-x-3">
            <button onClick={() => setSelectedChat(null)} className="text-zinc-400">
              <ChevronLeft size={24} />
            </button>
            <div className="relative">
              <img src={selectedChat.avatar} className="w-10 h-10 rounded-full border border-yellow-500" alt="" />
              {selectedChat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />}
            </div>
            <div>
              <p className="text-white font-bold text-sm">{selectedChat.user}</p>
              <p className="text-[10px] text-green-500 font-medium">{selectedChat.online ? 'Online' : 'Away'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-zinc-400">
            <Shield size={20} />
            <MoreVertical size={20} />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex justify-center my-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 bg-zinc-900/50 px-3 py-1 rounded-full border border-zinc-800">
              Today
            </span>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="flex items-end space-x-2 max-w-[80%]">
              <div className="bg-zinc-800 p-3 rounded-2xl rounded-bl-none text-white text-sm">
                Hey! Just wanted to say I loved your latest post about the gifting economy.
              </div>
            </div>
            
            <div className="flex items-end space-x-2 self-end max-w-[80%]">
              <div className="bg-yellow-500 p-3 rounded-2xl rounded-br-none text-black font-medium text-sm">
                Thank you so much Sarah! I'm glad you liked it. More content coming soon.
              </div>
            </div>

            <div className="flex items-end space-x-2 max-w-[80%]">
              <div className="bg-zinc-800 p-3 rounded-2xl rounded-bl-none text-white text-sm">
                {selectedChat.lastMsg}
              </div>
            </div>

            <div className="p-3 bg-zinc-900/50 rounded-xl border border-zinc-800 text-[10px] text-zinc-500 italic text-center">
              DAMA Chat: Messages are encrypted. We promote safe interactions.
            </div>
          </div>
        </div>

        <div className="p-4 bg-black border-t border-zinc-800 pb-8">
          <div className="flex items-center space-x-2 mb-3">
            <button className="text-zinc-500 hover:text-white"><ImageIcon size={22} /></button>
            <button className="text-zinc-500 hover:text-white"><Camera size={22} /></button>
            <button className="text-zinc-500 hover:text-white"><Smile size={22} /></button>
            <button className="text-yellow-500 hover:text-yellow-400 ml-auto flex items-center bg-yellow-500/10 px-3 py-1.5 rounded-full text-xs font-bold">
              <Gift size={16} className="mr-1.5" /> Gift
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="Type a message..." 
              className="h-12 bg-zinc-900 border-zinc-800 text-sm"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-black">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto pt-20 pb-24 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-white">Messages</h2>
        <button className="text-yellow-500 font-bold text-xs">New Chat</button>
      </div>

      <div className="space-y-2">
        {chats.map(chat => (
          <button 
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-zinc-900/50 transition-colors"
          >
            <div className="relative">
              <img src={chat.avatar} className="w-14 h-14 rounded-full border-2 border-zinc-800" alt="" />
              {chat.online && <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 rounded-full border-4 border-black" />}
            </div>
            <div className="flex-1 text-left">
              <div className="flex justify-between items-center mb-1">
                <span className="text-white font-bold">{chat.user}</span>
                <span className="text-[10px] text-zinc-500">{chat.time}</span>
              </div>
              <p className="text-xs text-zinc-500 truncate w-48">{chat.lastMsg}</p>
            </div>
            {chat.unread > 0 && (
              <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-[10px] font-black text-black">
                {chat.unread}
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-8 flex flex-col items-center justify-center opacity-30 text-center">
        <MessageCircle size={48} className="text-zinc-700 mb-2" />
        <p className="text-zinc-500 text-xs font-medium italic">End-to-end encrypted messaging</p>
      </div>
    </div>
  );
}