import React, { useEffect, useState } from 'react';
import { WorkshopList } from './components/WorkshopList';
import { ResourceDisplay } from './components/ResourceDisplay';
import { UpgradePanel } from './components/UpgradePanel';
import { INITIAL_STATE } from './data/initialState';
import type { GameState, Workshop } from './types';
import { calculateProduction } from './utils/gameLogic';
import { Snowflake } from 'lucide-react';

const SAVE_KEY = 'north-pole-idle-save';

function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const timeDiff = (Date.now() - parsed.lastSaved) / 1000;
      const newResources = parsed.resources.map(resource => ({
        ...resource,
        amount: resource.amount + calculateProduction(parsed, resource.id) * timeDiff,
      }));
      return { ...parsed, resources: newResources, lastSaved: Date.now() };
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => {
        const newResources = prev.resources.map(resource => ({
          ...resource,
          amount: resource.amount + calculateProduction(prev, resource.id),
        }));
        return {
          ...prev,
          resources: newResources,
          lastSaved: Date.now(),
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  const handleHireElf = (workshopId: string) => {
    setGameState(prev => {
      const workshop = prev.workshops.find(w => w.id === workshopId);
      if (!workshop) return prev;

      const cost = Math.floor(workshop.baseCost * Math.pow(1.15, workshop.elves));
      const cookies = prev.resources.find(r => r.id === 'cookies');
      if (!cookies || cookies.amount < cost) return prev;

      return {
        ...prev,
        resources: prev.resources.map(r =>
          r.id === 'cookies' ? { ...r, amount: r.amount - cost } : r
        ),
        workshops: prev.workshops.map(w =>
          w.id === workshopId ? { ...w, elves: w.elves + 1 } : w
        ),
      };
    });
  };

  const handleUpgradeWorkshop = (workshopId: string) => {
    setGameState(prev => {
      const workshop = prev.workshops.find(w => w.id === workshopId);
      if (!workshop) return prev;

      const cost = Math.floor(workshop.baseCost * Math.pow(2, workshop.level) * 5);
      const cookies = prev.resources.find(r => r.id === 'cookies');
      if (!cookies || cookies.amount < cost) return prev;

      return {
        ...prev,
        resources: prev.resources.map(r =>
          r.id === 'cookies' ? { ...r, amount: r.amount - cost } : r
        ),
        workshops: prev.workshops.map(w =>
          w.id === workshopId ? { ...w, level: w.level + 1 } : w
        ),
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Snowflake className="w-12 h-12 text-blue-300" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
              North Pole Workshop
            </h1>
            <Snowflake className="w-12 h-12 text-blue-300" />
          </div>
          <ResourceDisplay resources={gameState.resources} />
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <WorkshopList
              workshops={gameState.workshops}
              resources={gameState.resources}
              onHireElf={handleHireElf}
              onUpgrade={handleUpgradeWorkshop}
              production={gameState.workshops.map(workshop => ({
                id: workshop.id,
                amount: calculateProduction(gameState, workshop.resourceId),
              }))}
            />
          </div>
          <div>
            <UpgradePanel
              upgrades={gameState.upgrades}
              resources={gameState.resources}
              onPurchase={(upgradeId) => {
                // Implement upgrade purchase logic
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;