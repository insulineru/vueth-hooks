import { inject } from 'vue'
import type { TBlockNumberContext } from './../../providers/BlockNumberProvider.types'
import { BlockNumberProviderSymbol } from './../../providers/constants'

export function useBlockNumberContext() {
  return inject(BlockNumberProviderSymbol) as TBlockNumberContext
}
