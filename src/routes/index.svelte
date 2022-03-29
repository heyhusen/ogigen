<script lang="ts">
	import type { ParsedRquest } from '../../api/_types';
	import Input from '../components/Input.svelte';
	import Image from '../components/Image.svelte';
	import Select from '../components/Select.svelte';

	const layoutOptions = ['Home', 'Page', 'Blog'];

	const fontSizeOptions = [
		'5.5rem',
		'6rem',
		'6.5rem',
		'7rem',
		'7.5rem',
		'8rem',
		'8.5rem',
		'9rem',
		'9.5rem',
		'10rem',
		'10.5rem',
		'11rem',
		'11.5rem',
		'12rem',
	];

	const initial: ParsedRquest = {
		layout: 'home',
		fontSize: '5.5rem',
		text: '',
	};

	function changeLayout(event: Event) {
		initial.layout = (<HTMLSelectElement>event.target).value;
	}

	function changeFontSize(event: Event) {
		initial.fontSize = (<HTMLSelectElement>event.target).value;
	}

	function changeText(event: Event) {
		initial.text = (<HTMLInputElement>event.target).value;
	}
</script>

<svelte:head>
	<title>Ogigen</title>
</svelte:head>

<main>
	<div class="form">
		<Select
			label="Layout"
			options="{layoutOptions}"
			value="{initial.layout}"
			on:change="{changeLayout}"
		/>

		{#if initial.layout == 'page'}
		<Select
			label="Font Size"
			options="{fontSizeOptions}"
			value="{initial.fontSize}"
			on:change="{changeFontSize}"
		/>
		{/if}

		{#if initial.layout != 'home' }
		<Input label="Text" value="{initial.text}" on:input="{changeText}" />
		{/if}
	</div>

	<Image {...initial} />
</main>

<style lang="postcss">
	main {
		@apply flex flex-col gap-4;

		@media (min-width: 320px) {
			@apply gap-6;
		}

		@media (min-width: 640px) {
			@apply gap-8;
		}

		@media (min-width: 768px) {
			@apply gap-10;
		}

		@media (min-width: 1024px) {
			@apply flex-row gap-12;
		}

		@media (min-width: 1280px) {
			@apply gap-14;
		}
	}

	.form {
		@apply flex-1 flex flex-col gap-4;

		@media (min-width: 768px) {
			@apply gap-6;
		}
	}
</style>
