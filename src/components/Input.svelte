<script lang="ts">
	export let label: string;
	export let value: string;
</script>

<label>
	<span>{label}</span>

	<input type="text" bind:value on:input />
</label>

<style lang="postcss">
	label {
		@apply block;
	}

	span {
		@apply text-gray-700;

		@media (min-width: 768px) {
			@apply text-lg;
		}
	}

	input {
		@apply mt-1 block w-full border-gray-300;

		@media (min-width: 768px) {
			@apply mt-2;
		}
	}
</style>
