import type { QueryObserverOptions, QueryStatus } from 'react-query'

import type { DeepPartial } from './utilityTypes'

/**
 * #### Summary
 * An constant for block number interval of 10 blocks
 */
export const const_blockNumberIntervalShort: DeepPartial<TUpdateOptions> = { blockNumberInterval: 10 }

/**
 * #### Summary
 * An constant for block number interval of 50 blocks
 */
export const const_blockNumberIntervalMedium: DeepPartial<TUpdateOptions> = { blockNumberInterval: 50 }

/**
 * #### Summary
 * An constant for block number interval of 250 blocks
 */
export const const_blockNumberIntervalLong: DeepPartial<TUpdateOptions> = { blockNumberInterval: 250 }

export type TQueryOptions<GResult> = Omit<
  QueryObserverOptions<GResult, any>,
  | 'refetchInterval'
  | 'notifyOnChangeProps'
  | 'notifyOnChangePropsExclusions'
  | 'useErrorBoundary'
  | 'refetchOnWindowFocus'
  | 'refetchOnMount'
  | 'refetchOnReconnect'
> & {
  refetchOnWindowFocus?: boolean | 'always'
  refetchOnMount?: boolean | 'always'
  refetchOnReconnect?: boolean | 'always'
}

/**
 * #### Summary
 * Options for hooks that describe the behviour of updates.
 * By default, depending on the hook, it will update every block.
 *
 * ##### ✏️ Notes
 * The following options are available:
 * - interval: interval in blocknumber to update in (default 1) see {@link TUpdateOptions.blockNumberInterval}
 * - polling: in ms, should be over 10000ms.  This is set by {@link TUpdateOptions.query.refetchInterval}
 */
export type TUpdateOptions<GResult = any> = {
  /**
   * The interval in blocknumber for the hook to update in (default 1)
   */
  blockNumberInterval: number | undefined
  refetchInterval?: number
  query?: TQueryOptions<GResult>
}

/**
 * A helper to create default update options for hooks
 * @returns {TUpdateOptions}
 */
export const defaultUpdateOptions = <GResult = any>(): TUpdateOptions<GResult> => {
  return {
    blockNumberInterval: 1,
    refetchInterval: undefined,
    query: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: 30000,
    },
  }
}

/**
 * #### Summary
 * This type describes the tuple that is returned by most hooks
 * 1. result: the result of the hook
 * 2. update: a callback will refresh the results of hook manually
 * 3. status: the status of the query.  From react-query: 'idle' | 'loading' | 'error' | 'success'. You can use this for UX purposes, see {@link QueryStatus}.
 */
export type THookResult<T> = [result: T, update: () => void, status: QueryStatus]
