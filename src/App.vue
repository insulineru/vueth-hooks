<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { EthersProvider } from './lib/providers'
import BlockNumberProvider from './lib/providers/BlockNumberProvider.vue'
</script>

<template>
  <EthersProvider>
    <BlockNumberProvider>
      <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld msg="Hello Vue 3 + Vueth-hooks + TypeScript + Vite +" />
    </BlockNumberProvider>
  </EthersProvider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
