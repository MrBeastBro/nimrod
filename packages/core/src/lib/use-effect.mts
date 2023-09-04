import { api, effectScheduler } from './hook-api.mjs';
import type { InquirerReadline } from './read-line.type.mjs';

export function useEffect(
  cb: (rl: InquirerReadline) => void | (() => void),
  depArray: unknown[],
): void {
  api.withPointer((pointer) => {
    const oldDeps = pointer.get();
    const hasChanged =
      !Array.isArray(oldDeps) || depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));

    if (hasChanged) {
      effectScheduler.queue(cb);
    }
    pointer.set(depArray);
  });
}
