import { inject } from 'vue'
import { EthersProviderInitSymbol } from '../providers/constants'
import type { TEthersProviderInit } from '../providers/EthersProvider.types'

export function useInit() {
  const init = inject(EthersProviderInitSymbol) as TEthersProviderInit

  return { init }
}
