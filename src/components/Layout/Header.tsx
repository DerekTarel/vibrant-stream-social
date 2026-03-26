import { Search, Bell } from 'lucide-react';

export function Header({ onProfileClick }: { onProfileClick: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-b border-zinc-800 z-50">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/1493a793-429f-44a1-889e-8277e6bf613e/dama-logo-4d5fa90a-1774533572277.webp" 
            alt="DAMA" 
            className="w-8 h-8 rounded-lg"
          />
          <h1 className="text-xl font-black text-yellow-500 tracking-tighter">DAMA</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-zinc-400 hover:text-white"><Search size={22} /></button>
          <button className="text-zinc-400 hover:text-white relative">
            <Bell size={22} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-500 rounded-full border-2 border-black"></span>
          </button>
          <button 
            onClick={onProfileClick}
            className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-yellow-500 overflow-hidden"
          >
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
}