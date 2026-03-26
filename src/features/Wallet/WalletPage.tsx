import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Wallet, ArrowUpCircle, ArrowDownCircle, RefreshCw, Smartphone, Gift, Info } from 'lucide-react';
import { toast } from 'sonner';

export function WalletPage() {
  const [balance, setBalance] = useState(2540);
  const [gifts, setGifts] = useState(12450);
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'convert'>('deposit');
  const [amount, setAmount] = useState('');

  const handleTransaction = () => {
    if (!amount || isNaN(Number(amount))) {
      toast.error('Please enter a valid amount');
      return;
    }

    const val = Number(amount);

    if (activeTab === 'deposit') {
      if (val < 20) {
        toast.error('Minimum deposit is 20 KES');
        return;
      }
      setBalance(b => b + val);
      toast.success(`Transaction of ${val} KES initiated. Enter PIN on your phone.`);
    } else if (activeTab === 'withdraw') {
      if (val < 100 || val > 100000) {
        toast.error('Withdrawals must be between 100 and 100,000 KES');
        return;
      }
      if (val > balance) {
        toast.error('Insufficient balance');
        return;
      }
      setBalance(b => b - val);
      toast.success(`Withdrawal of ${val} KES successful! (10% fee applied)`);
    } else {
      const requiredGifts = val * 10;
      if (gifts < requiredGifts) {
        toast.error('Not enough gifts to convert');
        return;
      }
      setGifts(g => g - requiredGifts);
      setBalance(b => b + val);
      toast.success(`Converted ${requiredGifts} gifts to ${val} KES`);
    }
    setAmount('');
  };

  return (
    <div className="max-w-md mx-auto pt-20 pb-24 px-4">
      <h2 className="text-2xl font-black text-white mb-6">Digital Wallet</h2>

      <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 p-6 mb-6 border-none shadow-xl shadow-yellow-500/20">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-black/60 text-xs font-bold uppercase tracking-widest">Total Balance</p>
            <h3 className="text-4xl font-black text-black">KES {balance.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-black/10 rounded-2xl backdrop-blur-md">
            <Wallet className="text-black" size={28} />
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div>
            <p className="text-black/60 text-[10px] font-bold uppercase tracking-widest">Gifts Collected</p>
            <p className="text-lg font-bold text-black flex items-center">
              <Gift size={16} className="mr-1" /> {gifts.toLocaleString()}
            </p>
          </div>
          <div className="h-8 w-px bg-black/10" />
          <div>
            <p className="text-black/60 text-[10px] font-bold uppercase tracking-widest">Daily Limit</p>
            <p className="text-lg font-bold text-black">100k</p>
          </div>
        </div>
      </Card>

      <div className="flex space-x-2 mb-6">
        {(['deposit', 'withdraw', 'convert'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${activeTab === tab ? 'bg-zinc-800 border-yellow-500 text-yellow-500 shadow-lg' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}
          >
            {tab === 'deposit' && <ArrowUpCircle size={20} className="mb-1" />}
            {tab === 'withdraw' && <ArrowDownCircle size={20} className="mb-1" />}
            {tab === 'convert' && <RefreshCw size={20} className="mb-1" />}
            <span className="text-[10px] font-bold uppercase tracking-wider">{tab}</span>
          </button>
        ))}
      </div>

      <Card className="p-6 mb-6 border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-white font-bold capitalize">{activeTab} Funds</h4>
          <span className="text-zinc-500 text-[10px] flex items-center"><Info size={12} className="mr-1" /> 10% Service Fee</span>
        </div>

        <div className="space-y-4">
          {activeTab !== 'convert' && (
            <div className="flex space-x-2">
              <button className="flex-1 flex items-center justify-center p-3 bg-zinc-800 rounded-xl border border-zinc-700 text-white hover:border-yellow-500/50">
                <Smartphone size={18} className="mr-2 text-green-500" /> <span className="text-xs font-bold">MPESA</span>
              </button>
              <button className="flex-1 flex items-center justify-center p-3 bg-zinc-800 rounded-xl border border-zinc-700 text-white hover:border-yellow-500/50">
                <Smartphone size={18} className="mr-2 text-red-500" /> <span className="text-xs font-bold">AIRTEL</span>
              </button>
            </div>
          )}

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-500">
              {activeTab === 'convert' ? <Gift size={18} /> : 'KES'}
            </span>
            <Input 
              type="number" 
              placeholder={activeTab === 'convert' ? 'Amount to convert' : 'Amount to ' + activeTab} 
              className="pl-14 text-lg font-bold"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <Button className="w-full h-14" onClick={handleTransaction}>
            Confirm {activeTab}
          </Button>
        </div>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-white font-bold">Recent Activity</h4>
          <button className="text-yellow-500 text-xs font-bold">View All</button>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Gift Sent', user: '@sarah_m', amount: '-10 KES', time: '2 mins ago', icon: Gift, color: 'text-red-400' },
            { label: 'Deposit', user: 'via MPESA', amount: '+500 KES', time: '1 hour ago', icon: ArrowUpCircle, color: 'text-green-400' },
            { label: 'Gift Received', user: 'from Live Stream', amount: '+150 Gifts', time: '3 hours ago', icon: Gift, color: 'text-yellow-400' },
          ].map((tx, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center">
                  <tx.icon size={18} className={tx.color} />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">{tx.label}</p>
                  <p className="text-[10px] text-zinc-500">{tx.user} • {tx.time}</p>
                </div>
              </div>
              <span className={`text-sm font-bold ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-zinc-300'}`}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}