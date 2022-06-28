<script setup lang="ts">
import { formatEther } from 'ethers/lib/utils'
import { useBalance, useBlockNumberContext, useEthersAppContext, useInit } from '../lib/hooks/'

defineProps<{ msg: string }>()
// Define vueth-hooks state
const { isConnected, chainId, account } = useEthersAppContext()
const blockNumber = useBlockNumberContext()
const { init } = useInit()

const connect = () => {
  init()
}

const [yourLocalBalance] = useBalance(account, { blockNumberInterval: 10 })
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
  <p v-if="chainId">
    <code>Block number on {{ chainId }}: {{ blockNumber }}</code>.
  </p>
  <p v-if="isConnected">
    <code>{{ account }} balance is {{ formatEther(yourLocalBalance) }}</code>.
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
