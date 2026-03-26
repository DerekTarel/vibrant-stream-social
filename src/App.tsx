import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { AuthPage } from './features/Auth/AuthPage';
import { FeedPage } from './features/Feed/FeedPage';
import { LivePage } from './features/Live/LivePage';
import { WalletPage } from './features/Wallet/WalletPage';
import { InboxPage } from './features/Inbox/InboxPage';
import { ProfilePage } from './features/Profile/ProfilePage';
import { BottomNav } from './components/Layout/BottomNav';
import { Header } from './components/Layout/Header';

type Tab = 'home' | 'live' | 'create' | 'inbox' | 'wallet' | 'profile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[999]">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/1493a793-429f-44a1-889e-8277e6bf613e/dama-logo-4d5fa90a-1774533572277.webp" 
          alt="DAMA" 
          className="w-32 h-32 rounded-3xl animate-pulse border-4 border-yellow-500 mb-6"
        />
        <h1 className="text-4xl font-black text-yellow-500 tracking-tighter">DAMA</h1>
        <div className="mt-8 w-48 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-500 animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes loading {
            0% { width: 0%; }
            50% { width: 100%; }
            100% { width: 0%; }
          }
        `}} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <AuthPage onLogin={() => setIsAuthenticated(true)} />
        <Toaster position="top-center" richColors theme="dark" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-500 selection:text-black">
      <Header onProfileClick={() => setActiveTab('profile')} />
      
      <main className="pb-24">
        {activeTab === 'home' && <FeedPage />}
        {activeTab === 'live' && <LivePage />}
        {activeTab === 'inbox' && <InboxPage />}
        {activeTab === 'wallet' && <WalletPage />}
        {activeTab === 'profile' && <ProfilePage />}
        {activeTab === 'create' && (
          <div className="pt-24 px-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Create Content</h2>
            <p className="text-zinc-500 mb-8">Choose what you want to share with the community</p>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl flex flex-col items-center hover:border-yellow-500 transition-all">
                <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center mb-3">
                  <span className="text-2xl">📸</span>
                </div>
                <span className="font-bold">Post</span>
              </button>
              <button className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl flex flex-col items-center hover:border-yellow-500 transition-all" onClick={() => setActiveTab('live')}>
                <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center mb-3">
                  <span className="text-2xl">🔴</span>
                </div>
                <span className="font-bold">Go Live</span>
              </button>
            </div>
            <button className="mt-8 text-zinc-500 font-bold" onClick={() => setActiveTab('home')}>Cancel</button>
          </div>
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      <Toaster position="top-center" richColors theme="dark" />
    </div>
  );
}

export default App;