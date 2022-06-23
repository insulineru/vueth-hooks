import { inject } from 'vue'
import { EthersProviderInitSymbol } from '../providers/constants'
import type { IEthersProviderInit } from '../providers/EthersProvider.types'

export function useInit() {
  const init = inject(EthersProviderInitSymbol) as IEthersProviderInit

  return { init }
}
