import type { GameState } from '../types';

export function calculateProduction(state: GameState, resourceId: string): number {
  const workshop = state.workshops.find(w => w.resourceId === resourceId);
  if (!workshop) return 0;

  let baseProduction = workshop.baseProduction * workshop.elves * workshop.level;

  // Apply upgrades
  state.upgrades
    .filter(u => u.purchased && u.effect.type === 'production' && u.effect.target === workshop.id)
    .forEach(upgrade => {
      baseProduction *= upgrade.effect.multiplier;
    });

  return baseProduction;
}