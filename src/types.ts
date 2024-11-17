export interface Resource {
  id: string;
  name: string;
  amount: number;
  icon: string;
}

export interface Workshop {
  id: string;
  name: string;
  level: number;
  elves: number;
  baseProduction: number;
  resourceId: string;
  baseCost: number;
  description: string;
  happiness: number;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: { resourceId: string; amount: number }[];
  purchased: boolean;
  effect: {
    type: 'production' | 'happiness' | 'storage';
    target: string;
    multiplier: number;
  };
}

export interface GameState {
  resources: Resource[];
  workshops: Workshop[];
  upgrades: Upgrade[];
  totalHappiness: number;
  christmasSpirit: number;
  lastSaved: number;
}