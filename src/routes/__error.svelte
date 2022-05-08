<script lang="ts">
	import { base } from '$app/paths';
	import '../app.css';
</script>

<section>
	<h2>これより先に行ってはならん...</h2>
	<p>
		<a href={base}> 戻る </a>
	</p>
</section>

<style>
	section {
		min-height: calc(calc(100vh - 60px) - 2rem);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
