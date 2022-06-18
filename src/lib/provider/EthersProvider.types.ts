import type { Web3Provider } from '@ethersproject/providers'

export type IEthersProviderState = {
  provider: Web3Provider | null
  isConnected: boolean
  isLoading: boolean
}

export type IEthersProviderUpdate = (newState: Partial<IEthersProviderState>) => void
export type IEthersProviderInit = () => Promise<void>
