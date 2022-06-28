import { merge } from 'merge-anything'
import { invariant } from 'ts-invariant'
import type { DeepPartial, TQueryOptions, TUpdateOptions } from '../models'
import { defaultUpdateOptions } from '../models'

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

export const mergeDefaultUpdateOptions = <GResult = any>(
  ...overrides: DeepPartial<TUpdateOptions<GResult>>[]
): TUpdateOptions<GResult> => {
  const mergedOverrides = merge({}, ...overrides) as TUpdateOptions<GResult>
  const defaultOptions: TUpdateOptions = defaultUpdateOptions()

  if (overrides?.length > 0) {
    // since check passed on overrides, if polling is enabled, then blockNumberInterval must have been disabled
    if (mergedOverrides.refetchInterval) {
      checkUpdateOptions(mergedOverrides)
      defaultOptions.blockNumberInterval = undefined
    }
    return merge(defaultOptions, mergedOverrides)
  }

  return defaultOptions
}

export const processQueryOptions = <GResult>(
  options: TUpdateOptions<GResult>,
): typeof options.query & { refetchInterval?: number } => {
  checkUpdateOptions(options)

  const queryOptions: TQueryOptions<GResult> & { refetchInterval?: number } = { ...options.query }
  if (options.refetchInterval) {
    queryOptions.enabled = true
    queryOptions.refetchInterval = options.refetchInterval
  }
  return queryOptions
}
