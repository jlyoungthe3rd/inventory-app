import type { EquipSlot, Item } from '../types/item';

export const getTotalStats = (equipped: Record<EquipSlot, Item | null>) => {
  const statTotals: Item['stats'] = { hp: 0, mp: 0, str: 0, dex: 0, int: 0 };

  Object.values(equipped).forEach((item) => {
    if (!item) return;

    Object.entries(item.stats).forEach(([key, value]) => {
      statTotals[key as keyof Item['stats']] =
        (statTotals[key as keyof Item['stats']] || 0) + (value || 0);
    });
  });
  return statTotals;
};
