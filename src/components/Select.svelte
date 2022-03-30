<script lang="ts">
	export let label: string;
	export let options: string[];
	export let value: string;
</script>

<label>
	<span>{label}</span>

	<select on:change>
		{#each options as option}
			<option value={option.toLowerCase()} selected={option === value}>
				{option}
			</option>
		{/each}
	</select>
</label>

<style lang="postcss">
	label {
		@apply block;
	}

	span {
		@apply text-gray-700;

		@media (prefers-color-scheme: dark) {
			@apply text-gray-300;
		}

		@media (min-width: 768px) {
			@apply text-lg;
		}
	}

	select {
		@apply block w-full mt-1 border-gray-300;

		@media (min-width: 768px) {
			@apply mt-2;
		}

		@media (prefers-color-scheme: dark) {
			@apply bg-gray-800 border-gray-700;
		}
	}
</style>
