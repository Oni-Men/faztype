<svelte:head>
	<title>使い方</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="content">
	<h2>使い方</h2>

	<p>
		タイピングを始めると自動でストップウォッチが作動します。
		文章の入力が終わったら入力エリアの下にある終了ボタンを押してください。
		終了ボタンでタイマーが停止します。
	</p>

	<p>
		また、保存ボタンを押すと現在の文章からテンプレートを作成できます。
		テンプレートを使うとことで背景に文章が表示され入力に集中しやすくなります。
	</p>
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>
