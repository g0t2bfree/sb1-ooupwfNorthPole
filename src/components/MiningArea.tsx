import React from 'react';
import { Globe } from 'lucide-react';

interface Props {
  onMine: () => void;
  clickPower: number;
}

export function MiningArea({ onMine, clickPower }: Props) {
  return (
    <button
      onClick={onMine}
      className="relative group transition-transform active:scale-95 hover:scale-105"
    >
      <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
      <Globe 
        size={120} 
        className="text-purple-600 group-hover:text-purple-500 transition-colors"
      />
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-400">
        +{clickPower.toLocaleString()} per click
      </div>
    </button>
  );
}