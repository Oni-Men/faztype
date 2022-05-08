<script lang="ts">
	import { base } from '$app/paths';
</script>

<header>
	<a href={base}>
		<img src={base + '/logo.svg'} alt="Faztype" height="30px" />
	</a>
	<section>
		<a href={base + '/about'}> 使い方 </a>
		<!-- <a href="/settings">
			<span class="material-symbols-rounded"> settings </span>
		</a> -->
	</section>
</header>

<style>
	header {
		width: 100%;
		height: 60px;
		padding: 0 1em;
		box-sizing: border-box;
		background: var(--secondary-color);
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	section {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}
</style>
