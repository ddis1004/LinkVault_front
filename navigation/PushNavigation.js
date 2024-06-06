import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

let navigationReadyResolve;
const navigationReadyPromise = new Promise((resolve) => {
  navigationReadyResolve = resolve;
});

export function onNavigationReady() {
  if (navigationRef.isReady()) {
    navigationReadyResolve();
  }
}

export async function navigate(name, params) {
  if (!navigationRef.isReady()) {
    await navigationReadyPromise;
  }
  navigationRef.navigate(name, params);
}