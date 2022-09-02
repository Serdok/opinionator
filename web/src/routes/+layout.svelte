<script lang="ts">
	import { onMount } from 'svelte';
	import Accounts from '$lib/Accounts.svelte';
	import FloatingMessage from '$lib/FloatingMessage.svelte';
	import type { Account, EthereumProvider } from '$lib/types';

	import detectEthereumProvider from '@metamask/detect-provider';
	import { serializeError } from 'eth-rpc-errors';
	import '../app.postcss';

	let accounts: Array<Account> = [];
	let account: Account = undefined;
	let err: string | undefined = undefined;

	$: if (accounts.length === 0) account = undefined;

	$: console.log('[layout] accounts: ', accounts);
	$: console.log('[layout] account: ', account);
	

	const addListeners = (provider: EthereumProvider) => {
		provider.on('accountsChanged', (_accounts /* Array<Account> */) => {
			console.log('accounts changed', _accounts);
			accounts = _accounts as Array<Account>;
		});

		provider.on('chainChanged', (_chain /* number */) => {
			console.log('chain changed', _chain);
		});
		provider.on('connect', (connectInfo /* object */) => {
			console.log('connect', connectInfo);
		});
		provider.on('disconnect', (error /* object */) => {
			console.log('disconnect');
			if (error) {
				error = serializeError(error);
				console.error(error);
			}
		});
		provider.on('message', (message /* { type: string; data: unknown } */) => {
			console.log('message', message);
		});
	};

	const connect = async () => {
		try {
			const provider = (await detectEthereumProvider()) as EthereumProvider;

			await provider.request({ method: 'eth_requestAccounts' }) as Array<Account>;
		} catch (er) {
			err = serializeError(er).message;
		}
	};

	onMount(async () => {
		const provider = (await detectEthereumProvider()) as EthereumProvider;

		addListeners(provider);
	});
</script>

<Accounts {accounts} on:connect={connect} on:accountSelected={e => account = e.detail.selected}/>

{#if err}
	<FloatingMessage message={err} />
{/if}

<slot />
