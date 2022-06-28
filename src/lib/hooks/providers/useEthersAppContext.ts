import { inject } from 'vue'
import type { TEthersContext } from './../../models/ethersAppContextTypes'
import { EthersProviderStateSymbol } from './../../providers/constants'

export function useEthersAppContext() {
  return inject(EthersProviderStateSymbol) as TEthersContext
}
