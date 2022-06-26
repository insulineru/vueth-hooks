import type { Web3Provider } from '@ethersproject/providers'

export type TEthersProviderState = {
  provider: Web3Provider | null
  isConnected: boolean
  isLoading: boolean
  account?: string
  chainId?: number
}

export type TEthersProviderUpdate = (newState: Partial<TEthersProviderState>) => void
export type TEthersProviderInit = () => Promise<void>
