<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { StopWatchState } from './stop_watch';

	const dispatch = createEventDispatcher();

	let state: StopWatchState = StopWatchState.Ready;
	let started_at: number = performance.now();
	let stopped_at: number = performance.now();
	let sec: string = '00';
	let min: string = '00';

	const callbacks = [start, stop, reset];

	function update() {
		requestAnimationFrame(update);
		const now = performance.now();

		if (state == StopWatchState.Ready) {
			started_at = now;
			stopped_at = now;
		}

		if (state == StopWatchState.Working) {
			stopped_at = now;
		}

		const elapsed = (stopped_at - started_at) / 1000;
		min = Math.floor(elapsed / 60)
			.toFixed(0)
			.padStart(2, '0');
		sec = (elapsed % 60).toFixed(0).padStart(2, '0');
	}

	export function start() {
		if (state == StopWatchState.Working) {
			return;
		}
		dispatch('start');
		state = StopWatchState.Working;
	}

	export function stop() {
		dispatch('stop');
		state = StopWatchState.Stop;
	}

	export function reset() {
		dispatch('reset');
		state = StopWatchState.Ready;
	}

	export function action() {
		callbacks[state]();
	}

	export function get_state(): StopWatchState {
		return state;
	}

	onMount(() => {
		requestAnimationFrame(update);
	});
</script>

<section>
	<span class="material-symbols-rounded"> timer </span>
	<span>{min}:{sec}</span>
</section>

<style>
	section {
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 2px solid var(--primary-color);
		gap: 1rem;
	}

	span {
		font-size: 2rem;
	}
</style>
