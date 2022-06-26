<script setup lang="ts">
import { computed, inject, provide, reactive, readonly, toRefs, watchEffect } from 'vue'
import type { TEthersContext } from '../models'
import type { TBlockNumberState, TBlockNumberUpdate } from './BlockNumberProvider.types'
import { BlockNumberProviderSymbol, EthersProviderStateSymbol } from './constants'

const state = reactive<TBlockNumberState>({})

const setState: TBlockNumberUpdate = ({ chainId, blockNumber }) => {
  state[chainId] = blockNumber
}

const { chainId, provider } = inject(EthersProviderStateSymbol) as TEthersContext

const blockNumber = computed<number | undefined>(() => chainId.value && state?.[chainId.value] ? state?.[chainId.value] : 0)
provide(BlockNumberProviderSymbol, readonly(blockNumber))

watchEffect(() => {
  if (chainId.value && provider.value) {
    const network = chainId.value
    const update = (blockNumber: number): void => {
      setState({ chainId: network, blockNumber })
    }
    provider.value?.addListener?.('block', update)

    if (state?.[network] == null) {
      provider.value.getBlockNumber()
        .then((val: number) => {
          setState({ chainId: network, blockNumber: val })
        })
        .catch(() => {
          /* ignore */
        })
    }

    return (): void => {
      provider.value?.removeListener?.('block', update)
    }
  }
})
</script>

<template>
  <slot />
</template>
