import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-KE', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export const CURRENCY = 'KES';
export const GIFT_RATE = 10; // 1000 gifts = 100 KES => 10 gifts = 1 KES
export const SERVICE_FEE = 0.1;