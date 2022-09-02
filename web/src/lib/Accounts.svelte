<script lang="ts">
    import { createEventDispatcher } from 'svelte';
	import type { Account } from "$lib/types";

    export let accounts: Array<Account> = [];
	let selected: Account;

	const dispatch = createEventDispatcher();

	$: dispatch('accountSelected', { selected });

    const emitConnect = () => {
		dispatch('connect');
	};
</script>

<div class='connect'>
	{#if accounts.length === 0}
		<button type='button' on:click={emitConnect}>connect!</button>
	{:else}
		<select name='account-list' id='account-list' bind:value={selected} required>
			{#each accounts as account}
				<option value={account}>{account}</option>
			{/each}
		</select>
	{/if}
</div>