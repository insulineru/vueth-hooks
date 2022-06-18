import { inject } from 'vue'
import { EthersProviderInitSymbol } from '../provider/constants'
import type { IEthersProviderInit } from '../provider/EthersProvider.types'

export function useInit() {
  const init = inject(EthersProviderInitSymbol) as IEthersProviderInit

  return { init }
}
