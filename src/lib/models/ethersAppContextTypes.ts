import type { TEthersProvider } from './providerTypes'

/**
 * #### Summary
 * - ethers compatable provider {@link TEthersProvider}
 * - a callback to change the current signer
 * - the current account, chainId and signer
 * - callbacks to open the web3Modal, logout or change theme
 *
 * @category EthersAppContext
 */
export type TEthersContext = {
  provider: TEthersProvider | undefined
  isConnected: boolean
  isLoading: boolean
  account: string | undefined
  chainId: number | undefined
  // disconnectModal: (onSuccess?: () => void) => void
  // setModalTheme: ((theme: 'light' | 'dark') => void) | undefined
}
