<script lang="ts">
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';

    export let message = '';

    let visible = true;

    onMount(() => { setTimeout(() => { visible = false; }, 5000); })
</script>

{#if visible}
    <div in:fly="{{ y: 50, duration: 1000, }}" out:fly="{{ y: 50, duration: 1000, }}">{message}</div>
{/if}
