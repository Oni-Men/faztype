<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	let isShow = false;

	export function show() {
		isShow = true;
	}

	export function hide() {
		isShow = false;
	}
</script>

{#if isShow}
	<section class="background" on:click|self={hide} transition:fade={{ duration: 250 }}>
		<div transition:fly={{ y: 50, duration: 500 }}>
			<slot />
		</div>
	</section>
{/if}

<style>
	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	div {
		min-width: 600px;
		max-width: 1024px;
		min-height: 600px;
		padding: 1rem;
		border-radius: 1rem;
		background: white;
	}
</style>
