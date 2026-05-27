'use client';

import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/**
 * SSR-safe "are we on the client yet" check that avoids the
 * react-hooks/set-state-in-effect lint rule.
 *
 * Returns `false` during SSR / hydration, `true` after.
 */
export function useIsMounted(): boolean {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
