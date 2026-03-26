import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { toast } from 'sonner';
import { ShieldCheck, Phone, Mail, ArrowRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export function AuthPage({ onLogin }: { onLogin: () => void }) {
  const [step, setStep] = useState<'login' | 'register' | 'otp' | 'reset'>('login');
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (step === 'login' || step === 'register') {
        setStep('otp');
        toast.success('Verification code sent!');
      } else if (step === 'otp') {
        onLogin();
        toast.success('Welcome back!');
      } else if (step === 'reset') {
        setStep('otp');
        toast.success('Password reset link sent!');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 bg-cover bg-center relative" 
      style={{ backgroundImage: 'url(https://storage.googleapis.com/dala-prod-public-storage/generated-images/1493a793-429f-44a1-889e-8277e6bf613e/app-background-c28acb69-1774533574099.webp)' }}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      
      <div className="relative w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/1493a793-429f-44a1-889e-8277e6bf613e/dama-logo-4d5fa90a-1774533572277.webp" 
            className="w-24 h-24 rounded-3xl mb-4 border-4 border-yellow-500 shadow-2xl shadow-yellow-500/20"
          />
          <h1 className="text-4xl font-black text-white">DAMA</h1>
          <p className="text-yellow-500/80 font-medium">Connect • Live • Earn</p>
        </div>

        <Card className="p-8 border-yellow-500/30">
          <AnimatePresence mode="wait">
            <motion.form 
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <div className="text-center mb-2">
                <h2 className="text-2xl font-bold text-white">
                  {step === 'login' && 'Welcome Back'}
                  {step === 'register' && 'Create Account'}
                  {step === 'otp' && 'Verify Account'}
                  {step === 'reset' && 'Reset Password'}
                </h2>
                <p className="text-zinc-400 text-sm mt-1">
                  {step === 'login' && 'Enter your credentials to continue'}
                  {step === 'register' && 'Join the community for free'}
                  {step === 'otp' && 'We sent a code to your device'}
                  {step === 'reset' && 'Enter your contact info to get a reset link'}
                </p>
              </div>

              {(step === 'login' || step === 'register') && (
                <div className="flex bg-zinc-800 p-1 rounded-xl">
                  <button 
                    type="button"
                    onClick={() => setMethod('phone')}
                    className={cn(
                      "flex-1 flex items-center justify-center py-2 rounded-lg text-sm font-bold transition-all",
                      method === 'phone' ? "bg-yellow-500 text-black" : "text-zinc-400 hover:text-white"
                    )}
                  >
                    <Phone className="w-4 h-4 mr-2" /> Phone
                  </button>
                  <button 
                    type="button"
                    onClick={() => setMethod('email')}
                    className={cn(
                      "flex-1 flex items-center justify-center py-2 rounded-lg text-sm font-bold transition-all",
                      method === 'email' ? "bg-yellow-500 text-black" : "text-zinc-400 hover:text-white"
                    )}
                  >
                    <Mail className="w-4 h-4 mr-2" /> Email
                  </button>
                </div>
              )}

              {step === 'otp' ? (
                <div className="space-y-4">
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <input 
                        key={i} 
                        type="text" 
                        maxLength={1} 
                        className="w-12 h-12 bg-zinc-800 border-2 border-zinc-700 rounded-xl text-center text-xl font-bold text-yellow-500 focus:border-yellow-500 outline-none" 
                      />
                    ))}
                  </div>
                  <button type="button" className="text-xs text-yellow-500/60 hover:text-yellow-500 text-center w-full">
                    Didn't get code? Resend
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    {method === 'phone' ? <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" /> : <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />}
                    <Input 
                      placeholder={method === 'phone' ? 'Phone Number (e.g. 07...)' : 'Email Address'} 
                      className="pl-12"
                      required
                    />
                  </div>
                  {step !== 'reset' && (
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <Input 
                        type="password"
                        placeholder="Password" 
                        className="pl-12"
                        required
                      />
                    </div>
                  )}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-14 text-lg" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                ) : (
                  <>
                    {step === 'login' && 'Sign In'}
                    {step === 'register' && 'Sign Up'}
                    {step === 'otp' && 'Verify'}
                    {step === 'reset' && 'Send Code'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>

              <div className="text-center text-sm">
                {step === 'login' ? (
                  <>
                    <button type="button" onClick={() => setStep('reset')} className="text-yellow-500 hover:underline block mb-2 mx-auto">Forgot Password?</button>
                    <span className="text-zinc-500">Don't have an account? </span>
                    <button type="button" onClick={() => setStep('register')} className="text-yellow-500 font-bold hover:underline">Register</button>
                  </>
                ) : (
                  <>
                    <span className="text-zinc-500">Already have an account? </span>
                    <button type="button" onClick={() => setStep('login')} className="text-yellow-500 font-bold hover:underline">Sign In</button>
                  </>
                )}
              </div>
            </motion.form>
          </AnimatePresence>
        </Card>
        
        <div className="mt-8 flex items-center justify-center space-x-2 text-zinc-500 text-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>Secure AES-256 Encrypted Platform</span>
        </div>
      </div>
    </div>
  );
}