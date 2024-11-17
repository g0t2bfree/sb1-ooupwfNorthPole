import React from 'react';
import type { Upgrade, Resource } from '../types';

interface Props {
  upgrades: Upgrade[];
  resources: Resource[];
  onPurchase: (id: string) => void;
}

export function UpgradePanel({ upgrades, resources, onPurchase }: Props) {
  const canAfford = (costs: { resourceId: string; amount: number }[]) => {
    return costs.every(cost => {
      const resource = resources.find(r => r.id === cost.resourceId);
      return resource && resource.amount >= cost.amount;
    });
  };

  return (
    <div className="bg-blue-800/30 rounded-lg p-6 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-4">Upgrades</h2>
      <div className="space-y-4">
        {upgrades.filter(u => !u.purchased).map(upgrade => (
          <div
            key={upgrade.id}
            className="bg-blue-900/50 rounded-lg p-4"
          >
            <h3 className="font-bold mb-1">{upgrade.name}</h3>
            <p className="text-sm text-blue-300 mb-3">{upgrade.description}</p>
            <div className="flex justify-between items-center">
              <div className="text-sm">
                {upgrade.cost.map((cost, i) => (
                  <div key={i} className="text-blue-200">
                    {cost.amount} {resources.find(r => r.id === cost.resourceId)?.icon}
                  </div>
                ))}
              </div>
              <button
                onClick={() => onPurchase(upgrade.id)}
                disabled={!canAfford(upgrade.cost)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors
                  ${canAfford(upgrade.cost)
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-gray-700 cursor-not-allowed'}`}
              >
                Purchase
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}