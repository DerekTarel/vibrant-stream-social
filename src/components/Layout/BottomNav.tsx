import { Home, Play, MessageCircle, Wallet, User, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      'flex flex-col items-center justify-center space-y-1 transition-colors relative',
      isActive ? 'text-yellow-500' : 'text-zinc-500'
    )}
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
    {isActive && (
      <span className="absolute -top-1 w-1 h-1 bg-yellow-500 rounded-full" />
    )}
  </button>
);

export function BottomNav({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: any) => void }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-zinc-800 px-6 py-3 z-50">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <NavItem 
          icon={<Home size={24} />} 
          label="Home" 
          isActive={activeTab === 'home'} 
          onClick={() => onTabChange('home')} 
        />
        <NavItem 
          icon={<Play size={24} />} 
          label="Live" 
          isActive={activeTab === 'live'} 
          onClick={() => onTabChange('live')} 
        />
        <button 
          onClick={() => onTabChange('create')}
          className="bg-yellow-500 text-black p-3 rounded-2xl shadow-lg shadow-yellow-500/20 -mt-8 border-4 border-black"
        >
          <Plus size={24} strokeWidth={3} />
        </button>
        <NavItem 
          icon={<MessageCircle size={24} />} 
          label="Inbox" 
          isActive={activeTab === 'inbox'} 
          onClick={() => onTabChange('inbox')} 
        />
        <NavItem 
          icon={<Wallet size={24} />} 
          label="Wallet" 
          isActive={activeTab === 'wallet'} 
          onClick={() => onTabChange('wallet')} 
        />
      </div>
    </nav>
  );
}