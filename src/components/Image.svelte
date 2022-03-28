<script lang="ts">
	import Clipboard from 'svelte-clipboard';
	import type { ParsedRquest } from '../routes/api/_types';

	export let layout: ParsedRquest['layout'];
	export let fontSize: string;
	export let text: string;

	$: url = `/api?layout=${layout}&fontSize=${fontSize}&text=${encodeURIComponent(
		text
	)}`;
</script>

<Clipboard text="{url}" let:copy>
	<img src="{url}" alt="" on:click="{copy}" />
</Clipboard>

<style lang="postcss">
	img {
		@apply min-w-0 shadow-md cursor-pointer;

		@media (min-width: 1024px) {
			@apply w-3/5;
		}

		@media (min-width: 1280px) {
			@apply w-2/3;
		}
	}
</style>
