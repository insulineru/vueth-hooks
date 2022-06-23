import { computed, watch } from 'vue'
import { checkUpdateOptions } from '../functions'
import type { TUpdateOptions } from '../models'

/**
 * #### Summary
 * Calls update argument based on update options
 *
 * @param update Function to call when update
 * @param blockNumber Current block number
 * @param options Options for how often and when to update
 * @param allowBlockNumberUpdate Boolean of if updating using this hook is allowed
 */
export function useEthersUpdater(
  update: (() => void) | (() => Promise<void>),
  blockNumber: number | undefined,
  options: TUpdateOptions,
  allowBlockNumberUpdate = true,
): void {
  checkUpdateOptions(options)

  // number that only increases every (X * options.blockNumberInterval) blocks
  const blockNumberFilter = computed(() => Math.floor((blockNumber ?? 0) / (options.blockNumberInterval ?? 1)))

  watch([blockNumberFilter, update, options.refetchInterval], () => {
    if (allowBlockNumberUpdate) {
      // update if blocknumber or if polling
      if (blockNumber != null && !options.refetchInterval)
        update()
    }
  }, {
    immediate: true,
  })
}
