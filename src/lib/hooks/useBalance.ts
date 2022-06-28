import { BigNumber } from 'ethers'
import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import { useQuery } from 'vue-query'
import type { TRequiredKeys } from '../functions'
import { asyncForEach, mergeDefaultUpdateOptions, providerKey } from '../functions'
import type { THookResult, TUpdateOptions } from '../models'
import { keyNamespace } from '../models'
import { processQueryOptions } from './../functions/hookHelpers'
import { useBlockNumberContext, useEthersAppContext } from './providers'
import { useEthersUpdater } from './useEthersUpdater'

const queryKey: TRequiredKeys = { namespace: keyNamespace.signer, key: 'useBalance' }
/**
 * @internal
 * #### Summary
 * A conditional type for useBalance result based on input parameters.  It is either a BigNumber or a Record<string, BigNumber> depending on the input address being a string or string[]
 */
type TUseBalanceResult<GAddress extends string | string[]> = GAddress extends string[]
  ? Record<string, BigNumber>
  : BigNumber
const zero = BigNumber.from(0)

export function useBalance <GAddress extends string | Array<string>>(
  addresses: Ref<GAddress | undefined>,
  options: TUpdateOptions = mergeDefaultUpdateOptions(),
): THookResult<TUseBalanceResult<GAddress>> {
  const { provider } = useEthersAppContext()

  const keys = [{ ...queryKey, ...providerKey(provider.value) }, { addresses }] as const

  const { data, refetch, status } = useQuery(
    keys,
    async (keys): Promise<TUseBalanceResult<GAddress> | undefined> => {
      const { addresses } = keys.queryKey[1]
      const prov = provider.value
      if (prov && addresses) {
        if (Array.isArray(addresses)) {
          const result: TUseBalanceResult<string[]> = {}
          await asyncForEach(addresses, async (address: string) => {
            const balance = await prov.getBalance(address)
            result[address] = balance
          })
          return result as TUseBalanceResult<GAddress>
        }
        else {
          const address: string = addresses
          const newBalance = await prov.getBalance(address)
          return newBalance as TUseBalanceResult<GAddress>
        }
      }
      return undefined
    },
    {
      ...processQueryOptions<TUseBalanceResult<GAddress> | undefined>(options),
      isDataEqual: (oldResult, newResult) => oldResult?._hex === newResult?._hex,
    },
  )

  const blockNumber = useBlockNumberContext()
  useEthersUpdater(refetch, blockNumber, options)

  const result = ref<TUseBalanceResult<GAddress>>()
  watch(data, () => {
    if (Array.isArray(addresses))
      result.value = data.value ?? ({} as TUseBalanceResult<GAddress>)
    else
      result.value = data.value ?? (zero as TUseBalanceResult<GAddress>)
  }, {
    immediate: true,
    deep: true,
  })

  return [result.value!, refetch.value, status.value]
}
