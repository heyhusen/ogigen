<script lang="ts">
	import type { RequestEvent } from '@sveltejs/kit/types/private';
	import Clipboard from 'svelte-clipboard';
	import type { ParsedRquest } from '../../api/_types';

	export let location: RequestEvent['url'];
	export let layout: ParsedRquest['layout'];
	export let fontSize: ParsedRquest['fontSize'];
	export let text: ParsedRquest['text'];

	$: url = `${location.protocol}//${
		location.host
	}/api?layout=${layout}&fontSize=${fontSize}&text=${encodeURIComponent(String(text))}`;
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
