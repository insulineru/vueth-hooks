<script setup lang="ts">
import { inject, ref } from 'vue'
import { useInit } from '../lib/hooks/'
import { EthersProviderStateSymbol } from '../lib/provider/constants'
import type { IEthersProviderState } from '../lib/provider/EthersProvider.types'

defineProps<{ msg: string }>()
// Define vueth-hooks state
const { isConnected } = inject(EthersProviderStateSymbol) as IEthersProviderState

const { init } = useInit()

const connect = () => {
  init()
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <p>
    <code>isConnected: {{ isConnected }}</code>.
  </p>

  <button type="button" @click="connect">
    Let's go!
  </button>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
