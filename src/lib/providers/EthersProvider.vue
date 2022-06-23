<script lang="ts">
import { defineComponent, provide, reactive, readonly, toRefs } from 'vue'
import { ethers } from 'ethers'
import { useQueryProvider } from 'vue-query'
import type { TEthersContext } from '../models/ethersAppContextTypes'
import { EthersProviderInitSymbol, EthersProviderStateSymbol, EthersProviderUpdateSymbol } from './constants'

export default defineComponent({
  setup() {
    useQueryProvider()

    const state = reactive<TEthersContext>({
      provider: undefined,
      isConnected: false,
      isLoading: false,
      account: undefined,
      chainId: undefined,
    })

    provide(EthersProviderStateSymbol, toRefs(readonly(state)))

    const update = (updates: Partial<TEthersContext>) => {
      const res = { ...state, ...updates }

      // set updates to state and trigger update
      Object.keys(updates).forEach((key) => {
        const typedKey = key as keyof TEthersContext
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
        update({ provider, isConnected: true, isLoading: false })
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
