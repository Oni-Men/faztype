<script context="module" lang="ts">
	import { writable } from 'svelte/store';

	export const textSize = writable('1em');
</script>

<section>
	<h2>設定</h2>
	<div>
		<section class="textarea">
			<h3>入力エリア</h3>
			<ul>
				<li>文字サイズ</li>
			</ul>
		</section>
		<section class="dangerous">
			<h3>危険な設定</h3>
			<ul>
				<li>テンプレートをすべて削除</li>
			</ul>
		</section>
	</div>
</section>

<style>
	h2 {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
