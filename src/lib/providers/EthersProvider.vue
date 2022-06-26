<script lang="ts">
import { defineComponent, markRaw, provide, reactive, readonly, toRefs } from 'vue'
import { ethers } from 'ethers'
import { useQueryProvider } from 'vue-query'
import type { TEthersContext } from '../models/ethersAppContextTypes'
import { EthersProviderInitSymbol, EthersProviderStateSymbol, EthersProviderUpdateSymbol } from './constants'
import type { TEthersProviderState } from './EthersProvider.types'

export default defineComponent({
  setup() {
    useQueryProvider()

    const state = reactive<TEthersProviderState>({
      provider: null,
      isConnected: false,
      isLoading: false,
      account: undefined,
      chainId: undefined,
    })

    provide(EthersProviderStateSymbol, toRefs(readonly(state)))

    const update = (updates: Partial<TEthersProviderState>) => {
      const res = { ...state, ...updates }

      // set updates to state and trigger update
      Object.keys(updates).forEach((key) => {
        const typedKey = key as keyof TEthersProviderState
        // @ts-expect-error TODO: fix this
        state[typedKey] = res[typedKey]
      })
    }
    provide(EthersProviderUpdateSymbol, update)

    const init = async () => {
      update({ isLoading: true })
      try {
        const { default: Web3Modal } = await import('web3modal')

        const config = new Web3Modal({
          network: 'mainnet', // optional
          cacheProvider: true,
          providerOptions: {},
        })
        const instance = await config.connect()

        const provider = new ethers.providers.Web3Provider(instance)

        const account = await provider.getSigner().getAddress()
        const chainId = await provider.getNetwork().then(network => network.chainId)
        update({ provider: markRaw(provider), isConnected: true, isLoading: false, account, chainId })
      }
      catch (error) {
        console.error(error)
        update({ isLoading: false })
      }
    }
    provide(EthersProviderInitSymbol, init)
  },
})
</script>

<template>
  <slot />
</template>
