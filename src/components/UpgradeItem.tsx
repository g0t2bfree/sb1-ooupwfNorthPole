import React from 'react';
import { Upgrade } from '../types';

interface Props {
  upgrade: Upgrade;
  canAfford: boolean;
  onPurchase: () => void;
}

export function UpgradeItem({ upgrade, canAfford, onPurchase }: Props) {
  const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.count));
  const production = upgrade.baseOutput * upgrade.count;

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-white">{upgrade.name}</h3>
          <p className="text-sm text-gray-400">{upgrade.description}</p>
        </div>
        <span className="text-sm text-gray-400">Owned: {upgrade.count}</span>
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <div className="text-sm">
          <div className="text-purple-400">Cost: {cost.toLocaleString()} minerals</div>
          <div className="text-green-400">Producing: {production.toLocaleString()}/s</div>
        </div>
        <button
          onClick={onPurchase}
          disabled={!canAfford}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${canAfford 
              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
        >
          Buy
        </button>
      </div>
    </div>
  );
}