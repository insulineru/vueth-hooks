import type {
  JsonRpcProvider,
  JsonRpcSigner,
  Provider,
  StaticJsonRpcProvider,
  Web3Provider,
} from '@ethersproject/providers'
import type { Event, Signer, VoidSigner, Wallet } from 'ethers'
import type { Result } from 'ethers/lib/utils'

/**
 * #### Summary
 * A union of various ethers providers for ease of use and maximum flexiblity
 *
 * ##### ✏️ Notes
 * Used by vueth-hooks
 *
 * @category Models
 */
export type TEthersProvider = JsonRpcProvider | Web3Provider | StaticJsonRpcProvider

/**
 * #### Summary
 * A union of various providers and signers in ethers to give maximum flexibility
 *
 * @category Models
 */
export type TEthersProviderOrSigner =
  | JsonRpcProvider
  | Web3Provider
  | StaticJsonRpcProvider
  | Signer
  | JsonRpcSigner
  | Wallet
  | VoidSigner

/**
 * #### Summary
 * A union of various providers in ethers to give maximum flexibility
 *
 * @category Models
 */
export type TEthersSigner = Signer | JsonRpcSigner | Wallet | VoidSigner

/**
 * #### Summary
 * A union of abstract, non initalizable providers, used by some functions
 *
 * @category Models
 */
export type TAbstractProvider = Provider

/**
 * #### Summary
 * An generic extension of Event.  It types the the arguments and return values of the contract event to be used in typescript.
 *
 * @category Models
 */
export type TypedEvent<EventArgs extends Result> = Event & {
  args: EventArgs
}
