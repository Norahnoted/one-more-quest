export const STARTER = { id: 'starter', name: 'Little wooden sword' };
export const CATALOG = [
  { id: 'eraser', name: 'The Eraser', weapon: 'Second-draft blade' },
  { id: 'stapler', name: 'The Stapler', weapon: 'Steady-hand sword' },
  { id: 'sharpener', name: 'The Sharpener', weapon: 'Fresh-start spear' },
];
export function weaponName(id) { return id === STARTER.id ? STARTER.name : CATALOG.find(item => item.id === id)?.weapon; }
