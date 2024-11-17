import { GameState } from '../types';

export const INITIAL_STATE: GameState = {
  resources: [
    { id: 'cookies', name: 'Cookies', amount: 0, icon: '🍪' },
    { id: 'ornaments', name: 'Ornaments', amount: 0, icon: '🎭' },
    { id: 'songbooks', name: 'Song Books', amount: 0, icon: '📖' },
    { id: 'candycanes', name: 'Candy Canes', amount: 0, icon: '🍬' },
    { id: 'toys', name: 'Toys', amount: 0, icon: '🎮' },
  ],
  workshops: [
    {
      id: 'cookie-kitchen',
      name: 'Cookie Kitchen',
      level: 1,
      elves: 0,
      baseProduction: 0.5,
      resourceId: 'cookies',
      baseCost: 10,
      description: 'Bakes delicious Christmas cookies',
      happiness: 1,
    },
    {
      id: 'ornament-studio',
      name: 'Ornament Studio',
      level: 1,
      elves: 0,
      baseProduction: 0.3,
      resourceId: 'ornaments',
      baseCost: 25,
      description: 'Crafts beautiful Christmas ornaments',
      happiness: 1.2,
    },
    {
      id: 'music-hall',
      name: 'Music Hall',
      level: 1,
      elves: 0,
      baseProduction: 0.2,
      resourceId: 'songbooks',
      baseCost: 50,
      description: 'Composes festive Christmas carols',
      happiness: 1.5,
    },
    {
      id: 'candy-factory',
      name: 'Candy Factory',
      level: 1,
      elves: 0,
      baseProduction: 0.4,
      resourceId: 'candycanes',
      baseCost: 30,
      description: 'Produces striped candy canes',
      happiness: 1.3,
    },
    {
      id: 'toy-workshop',
      name: 'Toy Workshop',
      level: 1,
      elves: 0,
      baseProduction: 0.1,
      resourceId: 'toys',
      baseCost: 100,
      description: 'Creates magical Christmas toys',
      happiness: 2,
    },
  ],
  upgrades: [
    {
      id: 'cookie-recipe',
      name: 'Secret Recipe',
      description: 'Grandma\'s special recipe doubles cookie production',
      cost: [{ resourceId: 'cookies', amount: 100 }],
      purchased: false,
      effect: {
        type: 'production',
        target: 'cookie-kitchen',
        multiplier: 2,
      },
    },
    {
      id: 'happy-elves',
      name: 'Festive Break Room',
      description: 'Increases all workshops\' happiness by 50%',
      cost: [
        { resourceId: 'cookies', amount: 50 },
        { resourceId: 'songbooks', amount: 20 },
      ],
      purchased: false,
      effect: {
        type: 'happiness',
        target: 'all',
        multiplier: 1.5,
      },
    },
  ],
  totalHappiness: 0,
  christmasSpirit: 0,
  lastSaved: Date.now(),
};