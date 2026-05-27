'use client';

import { useEffect } from 'react';

export default function LocatorSetup() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('@locator/runtime').then(({ setup }) => setup());
    }
  }, []);

  return null;
}
