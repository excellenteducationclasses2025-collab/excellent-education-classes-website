import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';

/**
 * Wrapper around useActor that adds an `isReady` flag.
 * `isReady` is true only when:
 * 1. The AuthClient has finished initializing (isInitializing === false)
 * 2. The actor is non-null (has been successfully fetched)
 * 3. The actor is not currently being fetched
 */
export function useActorReady() {
  const { actor, isFetching } = useActor();
  const { isInitializing } = useInternetIdentity();

  // isReady: identity init done, actor fetch done, actor is non-null
  const isReady = !isInitializing && !isFetching && !!actor;

  return {
    actor,
    isFetching: isInitializing || isFetching,
    isReady,
  };
}
