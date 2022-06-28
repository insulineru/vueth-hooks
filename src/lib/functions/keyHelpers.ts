import { Provider } from '@ethersproject/providers'
import { Signer } from 'ethers'
import type { TEthersProvider, TEthersProviderOrSigner } from '../models'

export type TRequiredKeys = {
  namespace: string
  key: string
}

export type TKeyTypes = {
  provider?: string
  adaptor?: string
  contract?: string
  contractFunc?: string
}

/**
 * Get a react-query query key fo ethers provider
 * @param providerOrSigner
 * @returns
 */
export const providerKey = (
  providerOrSigner: TEthersProviderOrSigner | undefined,
): Record<'provider' | 'signer', string> => {
  if (providerOrSigner == null)
    return { provider: 'undefined provider', signer: 'undefined signer' }

  if (Provider.isProvider(providerOrSigner)) {
    const provider = providerOrSigner as TEthersProvider

    return {
      provider: `${provider?.network?.chainId}_${provider?.network?.name}_${provider?.connection.url.substring(0, 25)}`,
      signer: 'isProvider',
    }
  }
  else {
    const provider = (providerOrSigner as Signer).provider as TEthersProvider

    const signerStr: string = (providerOrSigner as any)?.address ?? ''
    if (provider && provider?.network && Signer.isSigner(providerOrSigner)) {
      return {
        signer: `isSigner_${providerOrSigner._isSigner}_${signerStr}`,
        provider: `${provider?.network?.chainId}_${provider?.network?.name}_${provider?.connection.url.substring(
          0,
          25,
        )}`,
      }
    }
  }

  return { provider: 'unknown provider', signer: 'unknown signer' }
}
