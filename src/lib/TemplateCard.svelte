<script lang="ts">
	import type { Template } from '../app';
	import { base } from '$app/paths';

	export let template: Template | null = null;

	let url = base + '/typing/' + (template != null ? template.id : 'new');
</script>

<section>
	<a href={url}>
		{#if template}
			<h3>{template.title}</h3>
			<p>{template.content}</p>
			<div class="cover" />
		{:else}
			<div class="add-box">
				<span class="material-symbols-rounded add"> add_circle </span>
			</div>
		{/if}
	</a>
</section>

<style>
	section {
		position: relative;
		height: 15rem;
		padding: 1rem 1rem;
		background: var(--secondary-color);
		overflow: hidden;
		border-radius: 0.5rem;
		box-sizing: border-box;
		box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
		transition: box-shadow 0.3s ease;
	}

	section:hover {
		box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.3);
	}

	h3 {
		margin: 0.5rem 0;
	}

	p {
		margin: 0.25rem 0;
	}

	.cover {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 10rem;
		background: linear-gradient(#0000, var(--secondary-color));
	}

	.add-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.add {
		font-size: 7.5rem;
		color: var(--primary-color);
	}
</style>
