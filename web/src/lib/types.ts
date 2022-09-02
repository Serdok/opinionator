import type { EventEmitter } from 'stream';

export type RPCMethod =
	| 'eth_accounts'
	| 'eth_call'
	| 'eth_getBalance'
	| 'eth_sendTransaction'
	| 'eth_sign'
	| 'eth_requestAccounts'
	| 'wallet_getPermissions'
	| 'wallet_requestPermissions'
	| 'wallet_addEthereumChain'
	| 'wallet_switchEthereumChain'
	| 'wallet_registerOnboarding'
	| 'wallet_watchAsset'
	| 'wallet_scanQRCode';

export type RPCEvent = 'accountsChanged' | 'chainChanged' | 'connect' | 'disconnect' | 'message';

interface RequestArguments {
	method: RPCMethod;
	params?: Array<unknown> | object;
}

export interface EthereumProvider extends EventEmitter {
	isMetaMask: boolean;
	chainId: number;
	isConnected: () => boolean;
	request: (args: RequestArguments) => Promise<unknown>;
	on: (evt: RPCEvent, listener: (...args: unknown[]) => void) => this;
	removeListener: (evt: RPCEvent, listener: (...args: unknown[]) => void) => this;
}

export type Account = string | undefined;
