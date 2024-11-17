import React from 'react';
import type { Workshop, Resource } from '../types';

interface Props {
  workshops: Workshop[];
  resources: Resource[];
  production: { id: string; amount: number }[];
  onHireElf: (id: string) => void;
  onUpgrade: (id: string) => void;
}

export function WorkshopList({ workshops, resources, production, onHireElf, onUpgrade }: Props) {
  const cookies = resources.find(r => r.id === 'cookies')?.amount || 0;

  return (
    <div className="grid gap-4">
      {workshops.map(workshop => {
        const elfCost = Math.floor(workshop.baseCost * Math.pow(1.15, workshop.elves));
        const upgradeCost = Math.floor(workshop.baseCost * Math.pow(2, workshop.level) * 5);
        const currentProduction = production.find(p => p.id === workshop.id)?.amount || 0;

        return (
          <div key={workshop.id} className="bg-blue-800/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{workshop.name}</h3>
                <p className="text-blue-300 text-sm">{workshop.description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-300">Level {workshop.level}</div>
                <div className="text-sm text-blue-300">{workshop.elves} Elves</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div>
                <div className="text-sm text-blue-200">
                  Production: {currentProduction.toFixed(1)}/s
                </div>
                <div className="text-sm text-blue-200">
                  Happiness: {(workshop.happiness * workshop.elves).toFixed(1)}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onHireElf(workshop.id)}
                  disabled={cookies < elfCost}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors
                    ${cookies >= elfCost
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-700 cursor-not-allowed'}`}
                >
                  Hire Elf ({elfCost} 🍪)
                </button>

                <button
                  onClick={() => onUpgrade(workshop.id)}
                  disabled={cookies < upgradeCost}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors
                    ${cookies >= upgradeCost
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-gray-700 cursor-not-allowed'}`}
                >
                  Upgrade ({upgradeCost} 🍪)
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}