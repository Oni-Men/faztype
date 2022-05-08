<script lang="ts">
	import StopWatch from '$lib/StopWatch.svelte';
	import type { Template } from 'src/app';
	import { onMount } from 'svelte';
	import Modal from '$lib/Modal.svelte';
	import { createID } from '$lib/id';
	import { templates } from '$lib/store';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let id: string = get(page).params.id;

	const labels = {
		ready: 'スタート',
		working: 'ストップ',
		reset: 'リセット'
	};

	let template: Template;
	let stopWatch: StopWatch;
	let label: string = labels.ready;

	let tmplArea: HTMLTextAreaElement;
	let textArea: HTMLTextAreaElement;
	let saveModal: Modal;

	let lockSave: boolean = false;

	onMount(() => {
		if (id === 'new') {
			template = {
				id: createID(),
				title: '新しいテキスト',
				content: '',
				length: 0,
				records: []
			};
		} else {
			const tmp = get(templates).get(id);
			if (tmp) {
				template = tmp;
			}
		}
	});

	function onInput() {
		stopWatch.start();
		const textAreaLines = textArea.value.split('\n').length;
		const tmplAreaLines = tmplArea.value.split('\n').length;

		if (textAreaLines > tmplAreaLines) {
			tmplArea.value += '\n'.repeat(textAreaLines - tmplAreaLines);
		}
	}

	function onScroll() {
		if (!tmplArea || !textArea) {
			return;
		}

		tmplArea.scrollTo({
			behavior: 'auto',
			top: textArea.scrollTop
		});
	}

	function onStart() {
		label = labels.working;
		lockSave = true;
	}

	function onStop() {
		label = labels.reset;
		lockSave = false;
	}

	function onReset() {
		label = labels.ready;
		textArea.value = '';
	}

	function openModal() {
		if (id === 'new') {
			template.content = textArea.value;
		}

		saveModal.show();
	}

	function save() {
		templates.add(template);
		saveModal.hide();
	}

	function remove() {
		templates.remove(template);
		saveModal.hide();
		goto('/');
	}
</script>

<svelte:head>
	<title>Faztype - 練習</title>
	<meta name="description" content="This is tool to check how fast you can type." />
</svelte:head>

<section class="typing">
	<h2>{template?.title}</h2>
	<div class="text-box">
		<textarea class="template" bind:this={tmplArea}>{template?.content}</textarea>
		<textarea class="input-area" on:scroll={onScroll} on:input={onInput} bind:this={textArea} />
	</div>
	<div class="control">
		<StopWatch bind:this={stopWatch} on:reset={onReset} on:start={onStart} on:stop={onStop} />
		<button on:click={stopWatch.action}>{label}</button>
		<button on:click={openModal} disabled={lockSave}>{id === 'new' ? '保存' : '編集'}</button>
	</div>
</section>
<Modal bind:this={saveModal}>
	<div class="modal">
		<h2>テンプレートを保存</h2>
		<section class="section">
			<span class="heading">タイトル</span>
			<input type="text" bind:value={template.title} />
		</section>
		<section>
			<span class="heading">文章</span>
			<textarea class="text" bind:value={template.content} />
		</section>
		<button on:click={save}>保存</button>
		<button on:click={remove} class="red" disabled={id === 'new'}>削除</button>
	</div>
</Modal>

<style>
	.typing {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	.text-box {
		position: relative;
		width: 50em;
		max-width: 100%;
		min-height: 500px;
		padding: 5px;
	}

	.input-area {
		background: rgba(255, 255, 255, 0.8);
	}

	.text-box textarea {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		font-size: 24px;
		resize: none;
		line-height: 2rem;
	}
	.text-box textarea::-webkit-scrollbar {
		display: none;
	}

	.control {
		min-width: 50%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem 0;
	}

	.control button {
		flex-basis: 150px;
	}

	.modal {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 0 5rem;
	}

	.modal section {
		display: flex;
		flex-direction: column;
	}
	.modal h2 {
		text-align: center;
	}

	.modal .text {
		resize: vertical;
		min-height: 5rem;
		max-height: 15rem;
	}

	button.red {
		background: #f33;
	}
</style>
