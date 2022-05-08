<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import TemplateCard from '$lib/TemplateCard.svelte';
	import { templates } from '$lib/store';
	import type { Template } from 'src/app';

	let items: Template[] = [];
	templates.subscribe((v) => {
		if (v && v.size != 0) {
			items = [...v.values()];
		}
	});
</script>

<svelte:head>
	<title>Faztype</title>
	<meta name="description" content="This is tool to check how fast you can type." />
</svelte:head>

<section>
	<h2>テンプレート一覧</h2>
	<div class="cards">
		<TemplateCard />
		{#each items as template}
			<TemplateCard bind:template />
		{/each}
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		flex: 1;
	}

	.cards {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 1.8rem 1.5rem;
	}
</style>
