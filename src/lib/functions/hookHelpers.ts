import { invariant } from 'ts-invariant'
import type { TUpdateOptions } from '../models'

/**
 * #### Summary
 * Hook that will verify update options are valid
 *
 * @param update Options for updating to be verified
 */
export const checkUpdateOptions = (update: TUpdateOptions): void => {
  // check if there is an override
  if (update.refetchInterval) {
    invariant(
      update.refetchInterval >= 10000,
      'Invalid refetchInterval (polling), must be at least 10000ms or undefined (disabled)',
    )
    invariant(
      update.blockNumberInterval === undefined,
      'You cannot use both refetchInterval (polling) and blockNumberInterval at the same time',
    )
  }
  else if (update.blockNumberInterval === undefined) {
    invariant(update.blockNumberInterval, 'Invalid blockNumberInterval, it cannot be undefined unless polling is used')
  }
  else {
    invariant(update.blockNumberInterval > 0, 'Invalid blockNumberInterval, must be greater than 0')
  }
}
