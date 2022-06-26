import type { ComputedRef } from 'vue'

export type TBlockNumberState = {
  [chainId: number]: number | undefined
}

export type TBlockNumberContext = ComputedRef<number | undefined>

export type TBlockNumberUpdatePayload = {
  chainId: number
  blockNumber: number
}
export type TBlockNumberUpdate = (payload: TBlockNumberUpdatePayload) => void
