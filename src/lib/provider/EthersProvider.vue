<script lang="ts">
import { defineComponent, provide, reactive, readonly, toRefs } from 'vue'
import type { Web3Provider } from '@ethersproject/providers'
import { EthersProviderStateSymbol, EthersProviderUpdateSymbol } from './constants'

export type IEthersProviderState = {
  provider: Web3Provider | null
  isConnected: boolean
  isLoading: boolean
}

export type IEthersProviderUpdate = (newState: Partial<IEthersProviderState>) => void
export default defineComponent({
  setup() {
    const state = reactive<IEthersProviderState>({
      provider: null,
      isConnected: false,
      isLoading: false,

    })

    provide(EthersProviderStateSymbol, toRefs(readonly(state)))

    const update = (updates: Partial<IEthersProviderState>) => {
      const res = { ...state, ...updates }

      // set updates to state and trigger update
      Object.keys(updates).forEach((key) => {
        const typedKey = key as keyof IEthersProviderState
        // @ts-expect-error TODO: fix this
        state[typedKey] = res[typedKey]
      })
    }
    provide(EthersProviderUpdateSymbol, update)
  },
})
</script>

<template>
  <slot />
</template>
