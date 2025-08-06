import { useState } from 'react';

export function useCooldown() {
  const [onCooldown, setCooldown] = useState(false);

  const startCooldown = (cooldownTime: number) => {
    setCooldown(true);
    setTimeout(() => {
      setCooldown(false);
    }, cooldownTime);
  };

  return { onCooldown, startCooldown };
}
